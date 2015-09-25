angular.module('articles').factory('Articles', ['$resouce', function($resouce){
  return $resouce('api/articles/:articleId', {
    articleId: '@_id'
  }, {
    update: 'PUT'
  });                  
}]);                 
                                                
