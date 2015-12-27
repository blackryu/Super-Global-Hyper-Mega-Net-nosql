   angular.module('app.listsService', ['ngRoute', 'ngResource'])
    .factory('Lists', function($resource) {
 return $resource('/list',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:true}
      
  }); 

})
    .factory('Todos', function($resource) {
 return $resource('/todos',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:true}
      
  }); 

}).factory('ListsPublic', function($resource) {
 return $resource('/list/public',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})
 

 .factory('ListsPrivate', function($resource) {
 return $resource('/list/private',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})