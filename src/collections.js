module.exports = ({ database, title }) => {
  if (title === 'tablerise') {
    return {
      database,
      collections: {
        systems: database.collection('systems'),
        realms: database.collection('realms'),
        gods: database.collection('gods'),
        feats: database.collection('feats'),
        backgrounds: database.collection('backgrounds'),
        races: database.collection('races'),
        items: database.collection('items'),
        weapons: database.collection('weapons'),
        armors: database.collection('armors'),
        classes: database.collection('classes'),
        monsters: database.collection('monsters'),
        spells: database.collection('spells'),
        wiki: database.collection('wiki'),
        magicItems: database.collection('magicItems')
      }
    }
  }
};