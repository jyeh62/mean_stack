var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app){
  app.route('/users').post(users.create)
    .get(users.list);

  app.route('/users/:userId')
    .get(users.read)
    .post(users.update)
    .delete(users.delete);

  app.route('/search/')
    .get(users.search);

  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));
  app.get('/signout', users.signout);

  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/singin'
    }));

  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'signin',
    successRedirect: '/'
  }));
  
  app.get('/oauth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/singin'
    }));

  app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: 'signin',
    successRedirect: '/'
  }));  
  app.param('userId', users.userById);
};
