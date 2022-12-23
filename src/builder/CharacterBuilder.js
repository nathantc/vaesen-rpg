import './CharacterBuilder.css';
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

  function renderBuildStep() {
    switch (characterBuild.step ?? 1) {
      case 1:
        return <CharacterClass />;
      default:
        return <CharacterUpbringing />
    }
  }

  return (
    <div>
      <h1>Character Builder {characterId}</h1>
      {renderBuildStep()}
    </div>
  )
}
