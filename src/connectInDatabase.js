const mongodb = require('mongodb');
const collections = require('./collections');
require('dotenv').config();

module.exports = async ({ title, username, password, host, port, database, initialString }) => {
  const firstSection = `${initialString}://${username}:${password}`;
  const secondSection = `@${host}:${port}/${database}`;

  const client = new mongodb.MongoClient(firstSection + secondSection, {
    serverApi: {
      version: mongodb.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB instance connected successfully');

    const instance = collections({ database: client.db(title), title });

    return instance;
  } catch (error) {
    await client.close();
    throw error;
  }
}
