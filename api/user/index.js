module.exports = function (context, req) {
  try {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const clientPrincipal = JSON.parse(decoded);

    let username = null;
    if (clientPrincipal != null) {
      switch (clientPrincipal.userId) {
        case '3c04743804e4d3754fa53c9b83f28042':
          username = 'Mr. Carver';
          break;
        default:
          username = 'unknown user!!';
      }
    }

    context.res.json({
      username: username
    });
  } catch (e) {
    console.log('Error retrieving user profile.', e);
    context.res.json({
      username: null
    });
  }
};
