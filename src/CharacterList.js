import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const apiUserCharacters = 'api/user-characters';

async function getUserCharacters() {
  const response = await fetch(apiUserCharacters);
  const data = await response.json();
  return data.characters;
}

async function createNewCharacter() {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: { name: 'New Character' }})
  };
  const response = await fetch(apiUserCharacters, requestOptions);
  const data = await response.json();
  return data._id;
}

export function CharacterList() {
  const [refreshList, setRefreshList] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshList === false) return;
    (async () => {
      setCharacters(await getUserCharacters());
      setRefreshList(false);
      navigate()
    })();
  });

  async function newCharacter() {
    setDisabled(true);
    try {
      const id = await createNewCharacter();
      navigate(`/builder/${id}`);
    } catch (e) {
      console.log(e);
      alert('Unexpected error occurred create a character.')
    }
  }

  const list = characters.map((character) => {
    return (
      <li key={character._id}>
        <Link to={'/characters/' + character._id}>{character.name}</Link>
      </li>
    )
  });

  return (
    <div>
      <h1>Characters</h1>
      <div><button disabled={disabled} onClick={newCharacter}>New Character</button></div>
      <ul>{list}</ul>
    </div>
  )
}
