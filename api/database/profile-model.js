const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const profileSchema = new mongoose.Schema({
  _id: String,
  name: String,
  identityDetails: String,
  identityProvider: String
});

const ProfileModel = mongoose.model('profile', profileSchema);

module.exports = ProfileModel;