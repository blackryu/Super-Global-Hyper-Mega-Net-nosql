 angular.module('app.listEdit', ['ngRoute', 'ngResource','app.listEditService'])
 .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit',function($scope,$routeParams,ListsEdit,Todos){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
          $scope.remove = function(){
              console.log("Made it to remove");
            ListsEdit.delete({id: $scope.list._name}).$promise.then(function(data) {
                window.location.replace('/');
            });
                     
          }
          
          $scope.update = function(){
              ListsEdit.update($scope.list).$promise.then(function(data) {
                   window.location.replace('/');
            });
          }
          
          $scope.isConfirmed = function(){
              console.log("going from isConfirmed");
              if(confirm("Are you sure you want to delete this entry?")){
                  $scope.remove();
              }
          }
    }])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
      .when('/list/:id',{
          templateUrl:'/listEdit/listEditView.html',
          controller:'ListControllerEdit'
        })
    }]);