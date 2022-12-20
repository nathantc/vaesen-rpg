import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const apiUserCharacters = '/api/user-characters';

async function fetchCharacter(id) {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ _id: id })
  };
  const response = await fetch(apiUserCharacters, requestOptions);
  const data = await response.json();
  return data.character[0];
}

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

export function CharacterEdit() {
  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (!isLoading) return;
    (async () => {
      setData(await fetchCharacter(characterId));
      setIsLoading(false);
    })();
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleChange = ({target}) => {
    const {name, value} = target;
    const newData = Object.assign({}, data, {[name]: value});
    setData(newData);
  };

  return (
    <div>
      <h1>Edit Character</h1>
      <div>
        <label>Name</label>
        <input type="text"
               name="name"
               onChange={handleChange}
               value={data.name}/>
      </div>
    </div>
  )
}
