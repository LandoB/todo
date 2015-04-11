var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('* * * * * * * * * * C O N N E C T E D * * * * * * * * * *'); //yay!
});


module.exports = db;
