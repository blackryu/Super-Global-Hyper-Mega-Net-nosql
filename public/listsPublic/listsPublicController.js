 angular.module('app.listsPublic', ['ngRoute', 'ngResource','app.listsPublicService','app.listsService'])
 .controller('ListControllerPublic',['$scope','ListsPublicAll','Lists',function($scope,ListsPublicAll,Lists,index){
    
$scope.lists = ListsPublicAll.query();
     
           $scope.showCompleted=true;
            $scope.filterCompleted=function(){
                if($scope.showCompleted){
                $scope.showCompleted=false;
                } else {
                    
                $scope.showCompleted=true;
                }
            }
            
            $scope.getIconForCompletedFilter=function(){
                if($scope.showCompleted){
                 return "chevron-up";
                } else {
                    return "chevron-down";
                } 
            }
     
     $scope.share=function(index){
         var newList=new Lists({
             _name:$scope.lists[index]._name,
             color:$scope.lists[index].color,
             visibility:$scope.lists[index].visibility,
             todos:$scope.lists[index].todos
         });
         
         newList.$update();
     }

    }])
    
     .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
       
      .when('/list/public',{
          templateUrl:'/listsPublic/listsPublicView.html',
          controller:'ListControllerPublic'
        })
    }]);