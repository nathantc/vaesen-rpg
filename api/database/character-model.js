const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const characterSchema = new mongoose.Schema({
  ownerId: String,
  name: String,
  profile: {
    age: String,
    archetype: String,
    motivation: String,
    trauma: String,
    darkSecret: String
  },
  attributes: {
    physique: Number,
    precision: Number,
    logic: Number,
    empathy: Number
  },
  resources: String,
  conditions: {
    physical: {
      exhausted: Boolean,
      battered: Boolean,
      wounded: Boolean,
      broken: Boolean
    },
    mental: {
      angry: Boolean,
      frightened: Boolean,
      hopeless: Boolean,
      broken: Boolean
    }
  },
  skills: {
    agility: Number,
    closeCombat: Number,
    force: Number,
    medicine: Number,
    rangedCombat: Number,
    stealth: Number,
    investigation: Number,
    learning: Number,
    vigilance: Number,
    inspiration: Number,
    manipulation: Number,
    observation: Number
  },
  experience: Number,
  relations: [{
    name: String,
    description: String,
  }],
  talents: [String],
  insights: [String],
  defects: [String],
  advantages: [String],
  equipment: [{
    description: String,
    bonus: String
  }],
  armor: {
    description: String,
    protection: String,
    agility: String
  },
  weapons: {
    description: String,
    damage: String,
    range: String,
    bonus: String,
  },
  memento: [String]
});

const CharacterModel = mongoose.model('characters', characterSchema);

module.exports = CharacterModel;