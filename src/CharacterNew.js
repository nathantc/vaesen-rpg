import {useState} from 'react';

const apiUserCharacters = '/api/user-characters';

async function saveUserCharacter(character) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: character})
  };
  await fetch(apiUserCharacters, requestOptions);
}

export function CharacterNew() {
  const [data, setData] = useState({});

  const handleChange = ({target}) => {
    const {name, value} = target;
    const newData = Object.assign({}, data, {[name]: value});
    setData(newData);
  };

  const handleSubmit = () => {
    (async () => {
      console.log('save character')
      await saveUserCharacter(data);
    })();
  }

  return (
    <div>
      <h1>New Character</h1>
      <div>
        <label>Name</label>
        <input type="text"
               name="name"
               onChange={handleChange}
               value={data.name}/>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}
