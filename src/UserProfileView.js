import './UserProfileView.css';
import {PropTypes} from 'prop-types';
import {Profile} from './api-data';
import {submitProfileChanges} from './api-services';
import {useState} from 'react';
import {Button} from 'antd';

export function UserProfileView({profile}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: profile.name
  });

  const handleChange = ({target}) => {
    const {name, value} = target;
    const newData = Object.assign({}, data, {[name]: value});
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    (async () => {
      try {
        await submitProfileChanges(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsSubmitting(false);
      }
    })();
    console.log(data);
  };

  const handleReset = () => {
    setData({ name: profile.name });
  }

  return (
    <div className="form page-center">
      <div className="row two">
        <label>Name</label>
        <input type="text"
               name="name"
               onChange={handleChange}
               value={data.name}
               disabled={isSubmitting}/>
      </div>
      <div className="row two">
        <div></div>
        <div className="buttons">
          <Button type="primary"
                  className="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}>
            Apply
          </Button>
          <Button onClick={handleReset} disabled={isSubmitting}>Reset</Button>
        </div>
      </div>
  </div>
  )
}

UserProfileView.propTypes = {
  profile: PropTypes.instanceOf(Profile)
}

export function UserName({profile}) {
  if (profile == null) {
    return <div></div>;
  }
  return <div>{profile.name}</div>
}

UserName.propTypes = {
  profile: PropTypes.instanceOf(Profile)
}
