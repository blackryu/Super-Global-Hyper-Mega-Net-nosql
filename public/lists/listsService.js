   angular.module('app.listsService', ['ngRoute', 'ngResource'])
    .factory('Lists', function($resource) {
 return $resource('/list/:id',{id:'@_name'},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:false}
      
  }); 

})
  .factory('Lists', function($resource) {
 return $resource('/list',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:false}
      
  }); 

})
   .factory('ListsPublic', function($resource) {
 return $resource('/list/public',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})
 

 .factory('ListsPrivate', function($resource) {
 return $resource('/list/private',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})