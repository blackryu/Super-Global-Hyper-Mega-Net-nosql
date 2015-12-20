 angular.module('app', ['ngRoute'])
    //---------------
    // Services
    //---------------
  .factory('Todos', ['$http', function($http){
      return $http.get('/todos');
    }])
.factory('Lists', ['$http', function($http){
      return $http.get('/list');
    }])
    .factory('publicLists', ['$http', function($http){
      return $http.get('/list/public');
    }])

    
    //---------------
    // Controllers
    //---------------
 
    .controller('ListController',['$scope','Lists',function($scope,Lists){
        
        /*
        $scope.checkboxes=function () {
        
                $('.checkbox input').iCheck({
        checkboxClass: 'icheckbox_flat',
        increaseArea: '20%'
    });

   
         
        
      };    
      $scope.checkboxes();*/
      $scope.lists=Lists;
        
    }])
    .controller('ListControllerCtrl',['$scope','$routeParams','Lists',function($scope,$routeParams,Lists){
        $scope.list=Lists[$routeParams.id];
    }])
    .controller('ListControllerCreate',['$scope','$routeParams','Lists',function($scope,$routeParams,Lists){
        
    }])
    .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {


    }])
    .controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
      $scope.todo = Todos[$routeParams.id];
    }])
  

    //---------------
    // Routes
    //---------------
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
        .when('/list',{
          templateUrl:'/lists.html',
          controller:'ListController'
        })
        .when('/list/create',{
          templateUrl:'/listCreate.html',
            controller:'ListControllerCreate'
      })
      .when('/list/:id',{
          templateUrl:'/listEdit.html',
          controller:'ListControllerCtrl'
        })
      
        
          .otherwise({
          templateUrl:'/lists.html',
          controller:'ListController'
      });
    }]);