angular.module('articles').config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/articles', {
      templateUrl: 'articles_/views/list-articles.client.view.html'
      }).
    when('/articles/create', {
      templateUrl: 'articles_/views/create-article.client.view.html'
      }).
    when('/articles/:articleId', {
      templateUrl: 'articles_/views/view-article.client.view.html'
      }).
    when('/articles/:articleId/edit', {
      templateUrl: 'articles_/views/edit-article.client.view.html'
      });
  }]);

                                   
