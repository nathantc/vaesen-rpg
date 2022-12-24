function getPrincipal(req) {
  const header = req.headers['x-ms-client-principal'];
  const encoded = Buffer.from(header, 'base64');
  const decoded = encoded.toString('ascii');
  const principal = JSON.parse(decoded);

  return principal;
}

function newContextResponse() {
  return {
    header: {
      'Content-Type': 'application/json'
    }
  }
}

module.exports = {getPrincipal, newContextResponse};