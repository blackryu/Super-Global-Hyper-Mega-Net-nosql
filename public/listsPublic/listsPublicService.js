angular.module('app.listsPublicService', ['ngRoute', 'ngResource'])
.factory('ListsPublicAll', function($resource) {
 return $resource('/list/publicAll',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})