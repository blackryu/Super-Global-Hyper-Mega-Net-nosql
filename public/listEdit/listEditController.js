 angular.module('app.listEdit', ['ngRoute', 'ngResource','app.listEditService'])
 .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit',function($scope,$routeParams,ListsEdit){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
       
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