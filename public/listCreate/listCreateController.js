angular.module('app.listCreate', ['ngRoute', 'ngResource','app.listsService'])
  
 
   
    .controller('ListControllerCreate',['$scope','Lists',function($scope,Lists,user,index){
        
     
$scope.lists = Lists.query();

        $scope.save = function(){
        if(!$scope.name || $scope.name.length < 1) return;
        var vis
        if($scope.visibility){
            vis="public"
        } else {
            vis="private"
        }
        var list = new Lists({ _name: $scope.name ,visibility:vis, color:$scope.color});

        list.$update(function(){
          $scope.lists.push(list);
          
        })
        
        window.location.replace('/');
      }

      
     
    }])
     .config(['$routeProvider', function ($routeProvider) {
      $routeProvider     
        .when('/list/create',{
          templateUrl:'/listCreate/listCreateView.html',
            controller:'ListControllerCreate'
      })
     }])