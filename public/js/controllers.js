 angular.module('app', ['ngRoute'])
    //---------------
    // Services
    //---------------
    .factory('Lists',function(){
     return [{
  "name": "testlist1",
  "aktiv": "true",
  "owner": "sabse",
  "color": "#fff",
  "visibility": "true",
  "todos": [
    {
      "name": "todo1",
      "completed": "true",
      "note": "note for todo"
    },
    {
      "name": "todo2",
      "completed": "true",
      "note": "note for todo"
    },
    {
      "name": "todo3",
      "completed": "false",
      "note": "note for todo"
    },
    {
      "name": "todo4",
      "completed": "false",
      "note": "note for todo"
    }
  ]
},
{
  "name": "testlist2",
  "aktiv": "true",
  "owner": "sabse",
  "color": "#fff",
  "visibility": "false",
  "todos": [
    {
      "name": "todo1",
      "completed": "true",
      "note": "note for todo"
    },
    {
      "name": "todo2",
      "completed": "true",
      "note": "note for todo"
    }
  ]
},
{
  "name": "testlist",
  "aktiv": "true",
  "owner": "sabse",
  "color": "#fff",
  "visibility": "true",
  "todos": [
    {
      "name": "todo1",
      "completed": "true",
      "note": "note for todo"
    },
    {
      "name": "todo2",
      "completed": "true",
      "note": "note for todo"
    },
    {
      "name": "todo3",
      "completed": "false",
      "note": "note for todo"
    }
  ]
}];
 })
    .factory('Todos',function(){
     return [
         { name: 'AngularJS Directives', completed: true, note: 'add notes...' },
        { name: 'Data binding', completed: true, note: 'add notes...' },
        { name: '$scope', completed: true, note: 'add notes...' },
        { name: 'Controllers and Modules', completed: true, note: 'add notes...' },
        { name: 'Templates and routes', completed: true, note: 'add notes...' },
        { name: 'Filters and Services', completed: false, note: 'add notes...' },
        { name: 'Get started with Node/ExpressJS', completed: false, note: 'add notes...' },
        { name: 'Setup MongoDB database', completed: false, note: 'add notes...' },
        { name: 'Be awesome!', completed: false, note: 'add notes...' },
     ];
 })
    
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
      $scope.todos = Todos;
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