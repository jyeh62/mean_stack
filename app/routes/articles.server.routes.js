var users = require('../../app/controllers/users.server.controller.js');
var articles = require('../../app/controllers/articles.server.controller.js');

module.exports = function(app){
  app.route('/api/articles')
    .get(log2, articles.list)
    .post(log2, users.requiresLogin, articles.create);

  app.route('/api/articles/:articleId')
    .get(log, articles.read)
    .put(users.requiresLogin, articles.hasAuthorization, log, articles.update)
    .post(users.requiresLogin, articles.hasAuthorization, log, articles.update)
    .delete(users.requiresLogin, articles.hasAuthorization, log, articles.delete);

  app.param('articleId', articles.articleById);
};

var log = function(req, res, next){
  console.log("in server route, " + req.method);
  next();
  };

var log2 = function(req, res, next){
  console.log("root in server route, " + req.method);
  next();
  };
