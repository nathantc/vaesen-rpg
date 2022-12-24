const CharacterBuildModel = require('../database/character-build-model');
const {getPrincipal, newContextResponse} = require('../azure/api-support')

module.exports = async function (context, req) {
  context.res = newContextResponse();
  const principal = getPrincipal(req);

  switch (req.method) {
    case 'GET':
      await getBuild(principal.userId, context);
      break;
    case 'POST':
      await updateBuild(principal.userId, context);
      break;
    default:
      context.res.status = 405;
  }
};

async function getBuild(userId, context) {
  const filter = {ownerId: userId};
  if (context.req.query.id) {
    filter._id = context.req.query.id;
  }
  const characters = await CharacterBuildModel.find(filter);

  context.res.body = {
    characters
  };
}

async function updateBuild(userId, context) {
  const _id = context.req.body.id;
  const data = context.req.body.data;
  data.ownerId = userId;

  if (_id === null || _id === undefined) {
    const result = await (new CharacterBuildModel(data)).save();
    context.res.body = {
      _id: result.id
    };
  } else {
    await CharacterBuildModel.updateOne({_id: _id, ownerId: userId}, data);
    context.res.body = {
      _id: id
    };
  }
}
