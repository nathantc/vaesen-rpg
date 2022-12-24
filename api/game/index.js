const GameModel = require('../database/game-model');
const auth = require('../azure/api-support')
const CharacterModel = require('../database/character-model');

module.exports = async function (context, req) {
  context.res = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const principal = auth.getPrincipal(req);
  switch (req.method) {
    case 'GET':
      await getGames(principal.userId, context);
      break;
    case 'POST':
      await updateGame(principal.userId, context);
      break;
    default:
      context.res.status = 405;
  }
};

async function getGames(ownerId, context) {
  const games = await GameModel.find({ownerId: ownerId});

  context.res.body = {
    games: games
  };
}

function isNewGame(_id) {
  return _id === null || _id === undefined;
}

async function updateGame(ownerId, context) {
  const _id = context.req.body.id;
  const data = context.req.body.data;
  data.ownerId = ownerId;

  if (_id === null || _id === undefined) {
    const result = await (new GameModel(data)).save();
  } else {
    console.log('updateOne:', _id, ownerId, data);

    savedGamed = await GameModel.findOne({_id: id, ownerId: ownerId});

    savedGamed.save()

    await CharacterModel.updateOne({_id: _id, ownerId: ownerId}, data);
  }

}

