const ProfileModel = require('../database/profile-model');
const auth = require('../azure/api-support');

module.exports = async function (context, req) {
  context.res = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const principal = auth.getPrincipal(req);
  switch (req.method) {
    case 'GET':
      await getProfile(principal, context);
      break;
    case 'POST':
      await updateProfile(principal, context);
      break;
    default:
      context.res.status = 405;
  }
};

async function getProfile(principal, context) {
  let profile = await ProfileModel.findById(principal.userId);
  if (profile == null) {
    profile = await ProfileModel.create({
      _id: principal.userId,
      name: principal.userDetails,
      identityDetails: principal.userDetails,
      identityProvider: principal.identityProvider
    });
  }

  context.res.body = {
    profile: {
      name: profile.name
    }
  };
}

async function updateProfile(principal, context) {
  const profile = context.req.body;
  const result = await ProfileModel.updateOne({_id: principal.userId}, profile);
  if (result.matchedCount === 1) {
    context.res.status = 204;
  } else {
    context.res.status = 404;
  }
}
