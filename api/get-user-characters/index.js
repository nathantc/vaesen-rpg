const {MongoClient} = require('mongodb');

module.exports = async function (context, req) {
  try {
    const header = req.headers['x-ms-client-principal'];
    if (header == null) {
      throw new Error('Authorization error')
    }

    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const userId = JSON.parse(decoded).userId;

    const mongoClient = new MongoClient(process.env.MONGODB_ATLAS_URI);
    const database = await mongoClient.db(process.env.MONGODB_ATLAS_DATABASE);
    const collection = database.collection('characters');
    const results = await collection.find({userId}).limit(10).toArray();

    context.res = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        results
      }
    }
  } catch (error) {
    context.res = {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        message: error.toString()
      }
    }
  }
}
