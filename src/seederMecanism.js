module.exports = async (seed, instance) => {
  try {
    const promises = [];
  
    for (let key in seed) {
      console.log(`:: Seed ${key} ::`);
      promises.push(instance.collections[key].insertMany(seed[key]));
    }
  
    await Promise.all(promises);
  } catch (error) {
    throw error;
  }
}
