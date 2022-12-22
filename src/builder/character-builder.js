export async function fetchCharacterBuild(characterId) {
  try {
    const response = await fetch(buildApi, newGetRequest({_id: characterId}));
    const payload = await response.json();
    return payload.character;
  } catch (e) {
    console.log(e);
    throw Error('Unable to retrieve character build data.');
  }
}

const buildApi = '/api/character-build';

function newGetRequest(body) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}
