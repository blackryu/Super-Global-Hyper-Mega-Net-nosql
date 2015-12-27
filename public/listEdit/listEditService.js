  angular.module('app.listEditService', ['ngRoute', 'ngResource'])
  
 
    //---------------
    // Services
    //---------------


   .factory('ListsEdit', function($resource) {
 return $resource('/list/:id',{id:'@_name'},{
      query: {method:'GET',isArray:false},
      update:{method:'POST',isArray:false},
      
  }); 
 
})
