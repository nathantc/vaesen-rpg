const CharacterModel = require('../database/character-model');
const auth = require('../azure/auth')

module.exports = async function (context, req) {
  context.res = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const principal = auth.getPrincipal(req);
  switch (req.method) {
    case 'GET':
      await getCharacters(principal.userId, context);
      break;
    case 'POST':
      await updateCharacter(principal.userId, context);
      break;
    default:
      context.res.status = 405;
  }
};

async function getCharacters(ownerId, context) {
  const characters = await CharacterModel.find({ownerId: ownerId});

  context.res.body = {
    characters: characters
  };
}

async function updateCharacter(ownerId, context) {
  const _id = context.req.body.id;
  const data = context.req.body.data;
  data.ownerId = ownerId;
  const options = {upsert: true};

  if (_id === null || _id === undefined) {
    await CharacterModel.insertMany({}, data);
  } else {
    await CharacterModel.updateOne({_id: _id, ownerId: ownerId}, data, options);
  }

}

