 angular.module('app.listEdit', ['ngRoute', 'ngResource','app.listEditService'])
 .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit',function($scope,$routeParams,ListsEdit,Todos){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
          $scope.remove = function(){
              console.log("Made it to remove");
            ListsEdit.delete({id: $scope.list._name}).$promise.then(function(data) {
                window.location.replace('/');
            });

            //$scope.update();
            
          }
          
          $scope.update = function(){
              console.log("and also made it to update");
              ListsEdit.update($scope.list).$promise.then(function(data) {
                   window.location.replace('/');
            });
          }
          
          $scope.isConfirmed = function(index, flag){
              console.log("going from isConfirmed");
              if(confirm("Are you sure you want to delete this entry?")){
                    if(flag){
                        console.log($scope.list.todos.active);
                        $scope.list.todos.active.splice(index,1);
                    } else {
                        console.log($scope.list.todos.completed);
                        $scope.list.todos.completed.splice(index,1);
	                }
	               // $scope.update();
              }
            console.log($scope.list.todos);
	        console.log(flag);
	        console.log(index);
	       
          }
    }])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
      .when('/list/:id',{
          templateUrl:'/listEdit/listEditView.html',
          controller:'ListControllerEdit'
        })
    }]);
