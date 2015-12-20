  angular.module('app', ['ngRoute', 'ngResource'])
    //---------------
    // Services
    //---------------
    .factory('Lists', function($resource) {
 return $resource('/list',{},{
      query: {method:'GET',isArray:true}
      
  }); 
  /*
   return $resource('/list/:id', null, {
            'update': { method:'PUT' }
          });*/
})

 

 
    //---------------
    // Controllers
    //---------------
 
    .controller('ListController',['$scope','Lists',function($scope,Lists,user){
        
        /*
        $scope.checkboxes=function () {
        
                $('.checkbox input').iCheck({
        checkboxClass: 'icheckbox_flat',
        increaseArea: '20%'
    });

   
         
        
      };    
      $scope.checkboxes();*/
    
$scope.lists = Lists.query();
var vis
        if($scope.visibility){
            vis="public"
        } else {
            vis="private"
        }
        $scope.save = function(){
        if(!$scope.name || $scope.name.length < 1) return;
        // TODO get the current user.
        var list = new Lists({ _name: $scope.name, owner: 'Sabrina-Sachs87@web.de' ,visibility:"public"});

        list.$save(function(){
          $scope.lists.push(list);
          
        })
        
        window.location.replace('/');
      }
    }])
    .controller('ListControllerCtrl',['$scope','$routeParams','Lists',function($scope,$routeParams,Lists){
       
    }])
    .controller('ListControllerCreate',['$scope','$routeParams','Lists',function($scope,$routeParams,Lists){
         $scope.lists = Lists.query();
          $scope.save = function(){
        if(!$scope.name || $scope.name.length < 1) return;
        var list = new Lists({ name: $scope.name, owner: $scope.user,visibility:$scope.visibility  });

        list.$save(function(){
          $scope.lists.push(list);
        })
      }
    }])
    .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {

    $scope.todos = Todos.query();
    
    $scope.save = function(){
        if(!$scope.newTodo || $scope.newTodo.length < 1) return;
        var todo = new Todos({ name: $scope.newTodo, completed: false });

        todo.$save(function(){
          $scope.todos.push(todo);
          $scope.newTodo = ''; // clear textbox
        })
      }

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
            controller:'ListController'
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