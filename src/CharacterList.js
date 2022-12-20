import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const apiUserCharacters = 'api/user-characters';

async function getUserCharacters() {
  const response = await fetch(apiUserCharacters);
  const data = await response.json();
  return data.characters;
}

export function CharacterList() {
  const [refreshList, setRefreshList] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (refreshList === false) return;
    (async () => {
      setCharacters(await getUserCharacters());
      setRefreshList(false);
    })();
  })

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
      <div><Link to="/characters/new">New Character</Link></div>
      <ul>{list}</ul>
    </div>
  )
}
