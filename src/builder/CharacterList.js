import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {fetchCharacterBuilds, newCharacterBuild} from './character-builder';

export function CharacterList() {
  const [refreshList, setRefreshList] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshList === false) return;
    (async () => {
      const data = await fetchCharacterBuilds();
      console.log('data response', data);
      setCharacters(data);
      setRefreshList(false);
      navigate()
    })();
  });

  async function newCharacter() {
    setDisabled(true);
    try {
      const id = await newCharacterBuild();
      navigate(`/character-build/${id}`);
    } catch (e) {
      console.log(e);
      alert('Unexpected error occurred create a character.')
    }
  }

  const list = characters.map((character) => {
    return (
      <li key={character._id}>
        <Link to={'/character-build/' + character._id}>{character.name}</Link>
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
