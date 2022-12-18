import {PropTypes} from 'prop-types';
import {Profile} from './api-data';

export function UserProfileView({profile}) {
  return (
    <div>
      <div><label>Name</label><span>{profile.name}</span></div>
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
