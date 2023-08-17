import { Db, Collection, MongoClient } from 'mongodb';

export interface declarationsType {
  [entityName: string]: [string];
}

export interface connectionInfoType {
  title: string;
  username: string;
  password: string;
  host: string;
  database: string;
  initialString: string;
}

export interface dbType {
  database: Db;
}

export interface collectionInstanceType extends dbType {
  title: string;
}

export interface collectionsType extends dbType {
  collections: Collection;
}

export interface seedType {
  [propName: string]: any;
}

export interface connectType {
  instance: collectionInstanceType;
  client: MongoClient;
}
