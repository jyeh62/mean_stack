var passport = require('passport');
var url = require('url');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('../config');
var users = require('../../app/controllers/users.server.controller');

module.exports = function(){
  passport.use(new TwitterStrategy({
    consumerKey : config.twitter.clientID,
    consumerSecret : config.twitter.clientSecret,
    callbackURL : config.twitter.callbackURL,
    passReqToCallback : true
  }, function(req, accessToken, refreshToken, profile, done){
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
console.log("log in with twitter : ", profile);
    var providerUserProfile = {      
      fullName : profile.displayName,      
      username : profile.username,
      provider : 'twitter',
      providerId : profile.id,
      providerData : providerData
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
