const { default: DatabaseManagement, mongoose } = require('@tablerise/database-management');

module.exports = async (
  seed,
  entity,
  operation
) => {
  const DB = new DatabaseManagement();

  if (operation === 'populate') {
    try {
      const promises = [];

      for (let key in seed) {
        console.log(`:: Seeding ${key} entity ::`);

        const model = DB.modelInstance(entity, key);

        seed[key].forEach((content) => {
          promises.push(model.create(content))
        });
      }

      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }

  if (operation === 'undo populate') {
    try {
      const promises = [];

      for (let key in seed) {
        console.log(`:: Erase ${key} entity ::`);
        promises.push(mongoose.model(key).deleteMany({}));
      }

      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }
};
