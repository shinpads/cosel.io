// Database is just a json file because I dont want to host a mongo db
const debug = require('debug');
const fs = require('fs');

const log = debug('pong:database');
const logError = debug('pong:database:error');

const fileName = __dirname + '/../data.json';
const db = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

function save() {

}

const database = {
  get: (collection, query) => {
    found = [];
    if (!db[collection]) return found;
    db[collection].forEach((doc) => {
      let success = true;
      Object.keys(query).forEach((q) => {
        if (doc[q] !== query[q]) {
          success = false;
        }
      });
      if (success) {
        found.push(doc);
      }
    });
    return found;
  },
  set: (collection, value, query) => {

  },
  add: (collection, value) => {
    db[collection].push(value);
    return value;
  },
  save: async () => {
    return new Promise(function(resolve, reject) {
      fs.writeFile(fileName, JSON.stringify(db, null, 2), (err) => {
        if (err) {
          logError('Failed to Save DB', err);
          reject(err);
        }
        log('Successfuly Saved DB');
        resolve(true);
      })
    });
  }
};

module.exports = database;
