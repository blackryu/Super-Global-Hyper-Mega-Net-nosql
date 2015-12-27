   angular.module('app.todosService', ['ngRoute', 'ngResource'])
    
    .factory('Todos', function($resource) {
 return $resource('/todos',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:true}
      
  }); 

})