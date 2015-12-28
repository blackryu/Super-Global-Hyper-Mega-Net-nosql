 angular.module('app.listEdit', ['ngRoute', 'ngResource','app.listEditService','app.todosService'])
 .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit','Todos',function($scope,$routeParams,ListsEdit,Todos){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
       $scope.todos=Todos.query();
          $scope.remove = function(){
            ListsEdit.delete({id: $scope.list._name}).$promise.then(function(data) {
                window.location.replace('/');
            });
                     
          }
          
          $scope.update = function(){
              ListsEdit.update($scope.list).$promise.then(function(data) {
            });
          }
    }])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
      .when('/list/:id',{
          templateUrl:'/listEdit/listEditView.html',
          controller:'ListControllerEdit'
        })
    }]);