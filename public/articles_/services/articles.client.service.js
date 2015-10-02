angular.module('articles').factory('Articles', ['$resource', function($resouce){
  return $resouce('api/articles/:articleId', {
    articleId: '@_id'
  }, {
    update: {
      methos: 'put'
      },
    updated: {
      methos: 'post'
      }    
  });                  
}]);                 
                                                
