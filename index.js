#!/usr/bin/env node

const readline = require('readline/promises');
const path = require('path');
const connectInDatabase = require('./src/connectInDatabase');
const seederMecanism = require('./src/seederMecanism');
const waitFor = require('./src/waitFor');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function seeder() {
  console.log('==== DATABASE SEEDER ====');
  console.log('Which entity do you want to populate in datababse?');
  console.log('===============================================');
  console.log('1) systems');
  console.log('===============================================');
  const choice = await rl.question('Choose an option (type the number): ');
  let entity;

  if (choice === '1') entity = 'systems';

  const start = Date.now();
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const database = process.env.MONGODB_DATABASE;
  const initialString = process.env.MONGODB_CONNECTION_INITIAL;

  const seeds = require(path.resolve(`./src/database/seeders/${entity}`));

  if (seeds) console.log('>> Seeds captured <<');
  if (!seeds) throw new Error('Seeds not captured [ import error ]');
  await waitFor(500);

  const connection = await connectInDatabase({
    title: 'tablerise',
    username,
    password,
    host,
    database,
    initialString
  });

  await waitFor(500);
  console.log(':: Start seeding ::');

  await seederMecanism(seeds, connection.instance);

  await waitFor(500);
  await connection.client.close();
  const end = Date.now();
  const executionTime = end - start;
  console.log(':: Seeding process complete - database populated with success ::');
  console.log(`:: Time of execution: ${executionTime - 1500}ms ::`);
};

seeder().then(() => rl.close()).catch((error) => { throw error });
