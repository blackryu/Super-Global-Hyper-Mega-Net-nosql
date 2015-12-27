angular.module('app.listCreate', ['ngRoute', 'ngResource'])
  
 
   
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
        // TODO owner set in the post method.
        var list = new Lists({ _name: $scope.name, owner: 'test@test.de' ,visibility:vis, color:$scope.color});

        list.$save(function(){
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