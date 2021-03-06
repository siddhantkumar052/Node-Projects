const MongoClient = require('mongodb').MongoClient;

let _connection = undefined;
let _db = undefined;

module.exports = {
  connectToDb: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect("mongodb://localhost:27017/");
      _db = await _connection.db("Siddhantkumar_Maske_lab10");
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  }
};