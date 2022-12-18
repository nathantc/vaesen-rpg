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
  name: String
});

const ProfileModel = mongoose.model('profile', profileSchema);

function getPrincipal(req) {
  const header = req.headers['x-ms-client-principal'];
  const encoded = Buffer.from(header, 'base64');
  const decoded = encoded.toString('ascii');
  const principal = JSON.parse(decoded);

  return principal;
}

module.exports = async function (context, req) {
  context.res = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const principal = getPrincipal(req);
  switch (req.method) {
    case 'GET':
      await getProfile(principal, context);
      break;
    case 'PUT':
      await updateTask(principal, context);
      break;
    default:
      context.res.status = 405;
  }
};

async function getProfile(principal, context) {
  let profile = await ProfileModel.findById(principal.userId);
  console.log(profile);
  if (profile == null) {
    profile = await ProfileModel.create({_id: principal.userId, name: principal.userDetails});
  }

  context.res.body = {profile: profile}
}


async function updateTask(principal, context) {
  const profile = context.req.body;
  const result = await ProfileModel.updateOne({_id: principal.userId}, profile);
  if (result.nModified === 1) {
    context.res.status = 204;
  } else {
    context.res.status = 404;
  }
}