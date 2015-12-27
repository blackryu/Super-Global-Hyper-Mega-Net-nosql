   angular.module('app.todosService', ['ngRoute', 'ngResource'])
    
    .factory('Todos', function($resource) {
 return $resource('/todos',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:false}
      
  });
})
   .factory('TodosEdit', function($resource) {
 return $resource('/todos/:id',{id:'@_id'},{
      query: {method:'GET',isArray:true},
      update: {method: 'PUT',isArray:false}
      
  });
})