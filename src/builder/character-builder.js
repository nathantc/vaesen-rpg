const buildApi = '/api/character-build';

export async function fetchCharacterBuilds() {
  const data = await get(buildApi);
  return data.characters;
}

export async function fetchCharacterBuild(characterId) {
  const data = await get(buildApi + '?id=' + characterId);
  return data.characters[0];
}

export async function newCharacterBuild() {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: { name: 'New Character' }})
  };
  const response = await fetch(buildApi, requestOptions);
  const data = await response.json();
  return data._id;
}

async function get(uri) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    };
    const response = await fetch(uri, requestOptions);
    return await response.json();
  } catch (e) {
    console.log(e);
    throw Error('Unable to retrieve character build data.');
  }
}
