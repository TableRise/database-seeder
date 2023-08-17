const mongodb = require('mongodb');
const collections = require('./collections');
import {
  declarationsType,
  connectionInfoType,
  connectType,
} from './types/databaseSeederTypes';

module.exports = async (
  declarations: declarationsType,
  {
    title,
    username,
    password,
    host,
    database,
    initialString,
  }: connectionInfoType
): Promise<connectType | Error> => {
  const firstSection = `${initialString}://${username}:${password}`;
  const secondSection = `@${host}/${database}`;

  const client = new mongodb.MongoClient(firstSection + secondSection, {
    serverApi: {
      version: mongodb.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('MongoDB instance connected successfully');

    const instance = collections(declarations, {
      database: client.db(title),
      title,
    });

    return { instance, client };
  } catch (error) {
    await client.close();
    throw error;
  }
};
