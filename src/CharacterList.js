import {useEffect, useState} from 'react';

export function CharacterList() {
  const [refreshList, setRefreshList] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (refreshList === false) return;
    (async () => {
      const response = await fetch('api/user-characters');
      const data = await response.json();
      setCharacters(data.characters);
      setRefreshList(false);
    })();
  })

  console.log('Characters: ', characters);
  const list = characters.map((character) => {
    return <li key={character._id}>{character.name}</li>
  });

  return (
    <div>
      <h1>Characters</h1>
      <ul>{list}</ul>
    </div>
  )
}
