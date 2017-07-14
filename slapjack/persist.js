var fs = require('fs');
var STORE = './store.json'

module.exports = {
  write: function(persist) {
    fs.writeFileSync(STORE, persist, { encoding: 'utf8' });
  },
  read: function() {
    return fs.readFileSync(STORE, { encoding: 'utf8' });
  },
  hasExisting: function() {
    return fs.existsSync(STORE);
  }
}
