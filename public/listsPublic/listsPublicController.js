 angular.module('app.listsPublic', ['ngRoute', 'ngResource','app.listsPublicService'])
 .controller('ListControllerPublic',['$scope','ListsPublicAll',function($scope,ListsPublicAll){
    
$scope.lists = ListsPublicAll.query();
     

    }])
     .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
       
      .when('/list/public',{
          templateUrl:'/listsPublic/listsPublicView.html',
          controller:'ListControllerPublic'
        })
    }]);