#!/usr/bin/env node

const readline = require('readline/promises');
const path = require('path');
const connectInDatabase = require('./src/connectInDatabase');
const seederMecanism = require('./src/seederMecanism');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function seeder() {
  console.log('==== Insert database credentials to connect ====');
  const username = await rl.question('username: ');
  const password = await rl.question('password: ');
  const host = await rl.question('host: ');
  const port = await rl.question('port: ');
  const database = await rl.question('database: ');
  const initialString = await rl.question('initialString: ');
  const file = await rl.question('Path to seed file ( JSON ): ');
  console.log('===============================================');

  const start = Date.now();
  const absolutePath = path.resolve(__dirname, file);
  const seeds = require(absolutePath);

  if (seeds) console.log('>> Seeds captured <<');
  if (!seeds) throw new Error('Seeds not captured [ import error ]');

  const instance = await connectInDatabase({
    title: 'Dungeons&Dragons',
    username,
    password,
    host,
    port,
    database,
    initialString
  });

  console.log(':: Start seeding ::');

  await seederMecanism(seeds, instance);

  const end = Date.now();
  const executionTime = end - start;
  console.log(':: Seeding process complete - database populated with success ::');
  console.log(`:: Time of execution: ${executionTime} ::`); 
};

seeder().then(() => rl.close()).catch((error) => { throw error });
