#!/usr/bin/env node

const readline = require('readline/promises');
const path = require('path');
const { default: DatabaseManagement, mongoose } = require("@tablerise/database-management");
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
  console.log('0) Exit');
  console.log('===============================================');
  const choiceOne = await rl.question('Choose an option (type the number): ');
  console.time(':: Time of execution ::');

  let entity = '';

  if (choiceOne === '1') entity = 'dungeons&dragons5e';
  if (choiceOne === '2') entity = 'user';
  if (choiceOne === '0') return;

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

  const environmentInfo = require(path.resolve('./tablerise.environment.js'));

  if (!environmentInfo)
    throw new Error(':: tablerise.environment.json not found ::');

  console.log(':: Environment variables found ::');

  const declarations = require(path.resolve('./src/infra/data/declarations.js'));

  if (!declarations)
    throw new Error(':: Declarations not read [ import error ] ::');

  console.log(':: Declarations read ::');

  await waitFor(500);

  DatabaseManagement.connect(true);

  await waitFor(500);

  console.log(':: Looking for seeds ::');

  const seed = require(path.resolve(`./src/infra/data/${entity}`));

  console.log(':: Seeds Found ::');

  await seederMecanism(
    seed,
    entity,
    choiceTwo === '1' ? 'populate' : 'undo populate'
  );

  await waitFor(500);

  await mongoose.connection.close();

  console.log(
    ':: Seeding process complete - database populated with success ::'
  );
  console.timeEnd(`:: Time of execution ::`);
}

seeder().then(() => rl.close());
