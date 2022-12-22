const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const gameSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
});

const GameModel = mongoose.model('games', gameSchema);

module.exports = GameModel;