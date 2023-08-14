module.exports = (declarations, { database, title }) => {
  const entities = declarations[title];
  collections = {};

  entities.forEach((ent) => {
    collections[ent] = database.collection(ent);
  });

  return {
    database,
    collections
  }
};