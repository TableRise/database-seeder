#!/usr/bin/env node

const readline = require('readline/promises');
const path = require('path');
const connectInDatabase = require('./src/connectInDatabase');
const seederMecanism = require('./src/seederMecanism');
const waitFor = require('./src/waitFor');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function seeder() {
  console.clear();
  console.log('==== DATABASE SEEDER ====');
  console.log('Which data do you want to seed in datababse?');
  console.log('===============================================');
  console.log('1) Dungeons & Dragons - 5° Edition');
  console.log('2) Users');
  console.log('===============================================');
  const choiceOne = await rl.question('Choose an option (type the number): ');

  let entity = '';
  if (choiceOne === '1') entity = 'dungeons&dragons5e';
  if (choiceOne === '2') entity = 'user';

  console.clear();
  console.log('==== DATABASE SEEDER ====');
  console.log('Which operation do you want to perform?');
  console.log('===============================================');
  console.log('1) populate');
  console.log('2) undo populate');
  console.log('0) back to menu');
  console.log('===============================================');
  const choiceTwo = await rl.question('Choose an option (type the number): ');

  if (choiceTwo === '0') return seeder();

  const start = Date.now();

  const environmentInfo = require(path.resolve('./tablerise.environment.js'));

  if (!environmentInfo)
    throw new Error(':: tablerise.environment.json not found ::');
  console.log(':: Environment variables found ::');

  const declarations = require(path.resolve('./src/data/declarations.js'));

  if (!declarations)
    throw new Error(':: Declarations not read [ import error ] ::');
  console.log(':: Declarations read ::');
  await waitFor(500);

  const connection = await connectInDatabase(declarations, {
    title: entity,
    username: environmentInfo.database_username,
    password: environmentInfo.database_password,
    host: environmentInfo.database_host,
    database: environmentInfo.database_database,
    initialString: environmentInfo.database_initialString,
  });

  await waitFor(500);
  console.log(':: Looking for seeds ::');

  const seed = require(path.resolve(`./src/data/${entity}`));

  console.log(':: Seeds Found ::');
  await seederMecanism(
    seed,
    connection.instance,
    choiceTwo === '1' ? 'populate' : 'undo populate'
  );

  await waitFor(500);
  await connection.client.close();
  const end = Date.now();
  const executionTime = end - start;
  console.log(
    ':: Seeding process complete - database populated with success ::'
  );
  console.log(`:: Time of execution: ${executionTime - 1500}ms ::`);
}

seeder()
  .then(() => rl.close())
  .catch((error) => {
    throw error;
  });
