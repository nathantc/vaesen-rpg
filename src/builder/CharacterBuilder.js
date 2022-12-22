import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {CharacterClass} from './CharacterClass';
import {CharacterUpbringing} from './CharacterUpbringing';
import {fetchCharacterBuild} from './character-builder';

export function CharacterBuilder() {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [characterBuild, setCharacterBuild] = useState({});

  useEffect(() => {
    if (!isLoading) return;
    (async () => {
      setCharacterBuild(await fetchCharacterBuild(characterId));
      setIsLoading(false);
    })();
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  var step = characterBuild.step ?? 1;
  switch (step) {
    case 1:
      step = <CharacterClass />;
      break;
    default:
      step = <CharacterUpbringing />
      break;
  }

  return (
    <div>
      <h1>Builder {characterId}</h1>
      {step}
    </div>
  )
}
