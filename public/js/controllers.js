  angular.module('app', ['ngRoute', 'ngResource'])
  
 
    //---------------
    // Services
    //---------------
    .factory('Lists', function($resource) {
 return $resource('/list',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:false},
    delete: {method: 'DELETE',isArray:false}
      
  }); 

})
   .factory('ListsEdit', function($resource) {
 return $resource('/list/:id',{},{
      query: {method:'GET',isArray:false},
      update:{method:'POST',isArray:false}
      
  }); 
 
})
 .factory('ListsPublic', function($resource) {
 return $resource('/list/public',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})
 .factory('ListsPrivate', function($resource) {
 return $resource('/list/private',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})

 
    //---------------
    // Controllers
    //---------------
 
    .controller('ListController',['$scope','Lists','ListsPrivate',function($scope,Lists,ListsPrivate,user,index){
        
     
    if(!$scope.filter){
$scope.lists = Lists.query();
}
$scope.filterPrivate=function(){
    $scope.lists=ListsPrivate.query();
     $scope.filter=true;
}

$scope.resetFilter=function(){
    $scope.lists=Lists.query();
     $scope.filter=false;
}

        $scope.save = function(){
        if(!$scope.name || $scope.name.length < 1) return;
        var vis
        if($scope.visibility){
            vis="public"
        } else {
            vis="private"
        }
        alert(vis)
        // TODO owner set in the post method.
        var list = new Lists({ _name: $scope.name, owner: 'test@test.de' ,visibility:vis, color:$scope.color});

        list.$save(function(){
          $scope.lists.push(list);
          
        })
        
        window.location.replace('/');
      }

      
      $scope.saveTodo = function(){
          var todo=$('#todo_name').val();
          
          var index=$('#idListHidden').val();
         
          
         var listObject= $scope.lists[index];
         listObject.todos.push({description:todo,completed:false});
         /*
         
      $scope.update = function(index){
        var todo = $scope.todos[index];
        Todos.update({id: todo._id}, todo);
        $scope.editing[index] = false;
      }

         
         *//*
         listObject.$update(function(index){
             $scope.lists[index]=ListObject;
             Lists[index]=listObject;
         })*/
         Lists.update({id:listObject._name,todos:listObject.todos},listObject);
      }

    }])
    .controller('ListControllerPublic',['$scope','ListsPublic',function($scope,ListsPublic){
    
$scope.lists = ListsPublic.query();
     

    }])
    .controller('ListControllerEdit',['$scope','$routeParams','ListsEdit',function($scope,$routeParams,ListsEdit){
       
       $scope.list=ListsEdit.get({id: $routeParams.id });
       
          $scope.remove = function(){
            //var list = $scope.lists[index];
            ListsEdit.delete({id: $scope.list._name})

                     window.location.replace('/');
          }
          
          $scope.update = function(){
              ListsEdit.update({_name:$scope.list._name,owner:"test@test.de",visibility:$scope.list.visibility,color:$scope.color})
               window.location.replace('/');
          }
    }])
   
    /*
    
    $scope.saveTodo=function(){
        
      //  if(!$scope._name || $scope._name.length < 1) return;
        
     
     //if(!$scope.todo_name || $scope.todo_name.length < 1) return;
        var list=Lists.get({id: $scope._name })
        alert($scope._name)
        alert($scope.todo_name)
        alert(list._name)
        //saveTodoIntern()
    }
    */
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
      .when('/list/public',{
          templateUrl:'/listsPublic.html',
          controller:'ListControllerPublic'
        })
      .when('/list/:id',{
          templateUrl:'/listEdit.html',
          controller:'ListControllerEdit'
        })
          .otherwise({
          templateUrl:'/lists.html',
          controller:'ListController'
      });
    }]);