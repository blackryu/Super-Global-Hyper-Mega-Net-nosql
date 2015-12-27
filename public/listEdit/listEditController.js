 angular.module('app.listEdit', ['ngRoute', 'ngResource','app.listEditService','app.todosService'])
 .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit','Todos',function($scope,$routeParams,ListsEdit,Todos){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
       $scope.todos=Todos.query();
          $scope.remove = function(){
            //var list = $scope.lists[index];
            ListsEdit.delete({id: $scope.list._name})

                     window.location.replace('/');
          }
          
          $scope.update = function(){
              ListsEdit.update({_name:$scope.list._name,  owner: 'test@test.de',visibility:$scope.list.visibility,color:$scope.list.color})
               window.location.replace('/');
          }
    }])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
      .when('/list/:id',{
          templateUrl:'/listEdit/listEditView.html',
          controller:'ListControllerEdit'
        })
    }]);