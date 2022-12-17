
module.exports = async function (context, req) {
  context.res = {
    status: 500,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      message: 'Not implemented'
    }
  }
}
