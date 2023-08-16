import {
  declarationsType,
  collectionInstanceType,
  collectionsType,
} from './types/databaseSeederTypes';
import { Collection } from 'mongodb';

module.exports = (
  declarations: declarationsType,
  { database, title }: collectionInstanceType
): collectionsType => {
  const entities = declarations[title];
  const collections = {} as Collection;

  entities.forEach((ent) => {
    collections[ent] = database.collection(ent);
  });

  return {
    database,
    collections,
  };
};
