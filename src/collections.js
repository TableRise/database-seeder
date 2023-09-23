module.exports = (
  declarations,
  { database, title }
) => {
  const entities = declarations[title];
  const collections = {};

  console.log(entities);

  entities.forEach((ent) => {
    collections[ent] = database.collection(ent);
  });

  console.log(collections);

  return {
    database,
    collections,
  };
};
