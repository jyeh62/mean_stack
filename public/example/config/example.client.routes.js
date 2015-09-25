var router = function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'example/views/example.client.view.html'
    })
  .otherwise({
    redirectTo: '/'
    });
  };

angular.module('example').config(['$routeProvider', router]);


