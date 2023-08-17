import { collectionsType, seedType } from './types/databaseSeederTypes';

module.exports = async (
  seed: seedType,
  instance: collectionsType,
  operation: string
): Promise<void | Error> => {
  if (operation === 'populate') {
    try {
      const promises = [];

      for (let key in seed) {
        console.log(`:: Seeding ${key} entity ::`);
        promises.push(instance.collections[key].insertMany(seed[key]));
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
        promises.push(instance.collections[key].deleteMany({}));
      }

      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }
};
