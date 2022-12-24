const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const characterBuildSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  step: Number,
  societyClass: String
});

const CharacterBuildModel = mongoose.model('characters', characterBuildSchema);

module.exports = CharacterBuildModel;
