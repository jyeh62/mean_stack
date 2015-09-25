var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

function websiteUrl(url){
  console.log("webSiteUrl :: ");
  if(!url){
    return url;
  }
  else{
    console.log(url + ", index = " + url.indexOf('http://'));
    if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
      url = 'http://' + url;
    }
    return url;
  }
};


var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
    },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required'
  },  
  password: {
    type: String,
    validate: [
      function(password){
        return password.length >= 6;
        }, 'Password should be longer']
    },
  salt: {
    type: String
    },
  provider: {
    type: String,
    required: 'Provider is required'
    },
  providerId: String,
  prividerData: {},
  created: {
    type: Date,
  default: Date.now
  }

});
UserSchema.statics.findOneByUsername = function(username, callback){
  this.findOne({username: new RegExp(username, 'i')}, callback);
  };

//UserSchema.set('toObject', {getters: true});

UserSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
  })
.set(function(fullName){
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
  });

UserSchema.set('toJson', { getters: true, virtual: true });
UserSchema.pre('save', function(next){
  if(this.isNew){
    console.log('A new user was create');
  }
  else{
    console.log('A user updated is details.');
  }
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64')).toString('base64');;
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password){
  //if(this.salt)
  console.log("hashPassword : password = " + password);
  {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    }
  return false;
  };

UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
  };

UserSchema.statics.findUniqueUserName = function(username, suffix, callback){
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user){
    if(!err){
      if(!user){
        callback(possibleUsername);
      }
      else{
        return _this.findUniqueUserName(username, (suffix || 0) + 1, callback);
      }
    }
    else{
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
    },
  content: {
    type: String,
    required: true
    },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
    }
  });

mongoose.model('Post', PostSchema);
