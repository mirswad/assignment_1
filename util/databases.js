const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

 let _db;
const mongoConnect = callback => {
MongoClient.connect('mongodb+srv://admin:admin@cluster0-sm6lw.mongodb.net/shop?retryWrites=true&w=majority')
.then(client => {
    console.log('connected with MongoDB');
    _db = client.db();
    callback();
})
.catch(err => {
    console.log(err);
    throw err;
});
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No databsase Found';
};

//module.exports = monogoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

