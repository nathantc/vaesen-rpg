const CharacterModel = require('../database/character-model');
const auth = require('../azure/auth')

module.exports = async function (context, req) {
  console.log(context)
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

async function getCharacters(userId, context) {
  const filter = {ownerId: userId};
  if (context.req.query.id) {
    filter._id = context.req.query.id;
  }
  const characters = await CharacterModel.find(filter);

  context.res.body = {
    characters: characters
  };
}

async function updateCharacter(userId, context) {
  const _id = context.req.body.id;
  const data = context.req.body.data;
  data.ownerId = userId;

  if (_id === null || _id === undefined) {
    const result = await (new CharacterModel(data)).save();
    context.res.body = {
      _id: result.id
    };
  } else {
    console.log('updateOne:', _id, userId, data);
    await CharacterModel.updateOne({_id: _id, ownerId: userId}, data);
    context.res.body = {
      _id: id
    };
  }

}
