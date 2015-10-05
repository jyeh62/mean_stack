var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);
  require('../app/models/user.server.model');
  require('../app/models/article.server.model');
  console.log('db connecting..');
  mongoose.connection.on("connected", function(err){
    console.log("mongoose done");
    });
  return db;
};

