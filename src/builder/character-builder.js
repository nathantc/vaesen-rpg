export async function fetchCharacterBuild(characterId) {
  try {
    const response = await fetch(buildApi + '?id=' + characterId, getHeader());
    const payload = await response.json();
    return payload.character;
  } catch (e) {
    console.log(e);
    throw Error('Unable to retrieve character build data.');
  }
}

const buildApi = '/api/user-characters';

function getHeader() {
  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
}
