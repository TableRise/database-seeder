module.exports = ({ database, title }) => {
  if (title === 'Dungeons&Dragons') {
    return {
      database,
      collections: {
        systems: database.collection('systems'),
        races: database.collection('races'),
        items: database.collection('items'),
        weapons: database.collection('weapons'),
        armors: database.collection('armors'),
        backgrounds: database.collection('backgrounds'),
        feats: database.collection('feats'),
        wiki: database.collection('wiki'),
        monsters: database.collection('monsters'),
        classes: database.collection('classes'),
        spells: database.collection('spells'),
        realms: database.collection('realms'),
        gods: database.collection('gods'),
      }
    }
  }
};