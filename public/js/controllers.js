  angular.module('app', ['ngRoute', 'ngResource'])
  
 
    //---------------
    // Services
    //---------------
    .factory('Lists', function($resource) {
 return $resource('/list',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:true}
      
  }); 

})
    .factory('Todos', function($resource) {
 return $resource('/todos',{},{
      query: {method:'GET',isArray:true},
      update: {method: 'POST',isArray:true}
      
  }); 

})

   .factory('ListsEdit', function($resource) {
 return $resource('/list/:id',{id:'@_name'},{
      query: {method:'GET',isArray:false},
      update:{method:'POST',isArray:false},
      
  }); 
 
})

 .factory('ListsPublic', function($resource) {
 return $resource('/list/public',{},{
      query: {method:'GET',isArray:true}
      
  }); 

})
.factory('ListsPublicAll', function($resource) {
 return $resource('/list/publicAll',{},{
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
 
    .controller('ListController',['$scope','Lists','ListsPrivate','ListsPublic','ListsEdit','Todos',function($scope,Lists,ListsPrivate,ListsPublic,ListsEdit,Todos,user,index){
        
     
$scope.lists = Lists.query();

$scope.filterPrivates=function(){
    if((!$scope.filterPrivate) && (!$scope.filterPublic)){
        $scope.filterPrivate=true;
        $scope.lists=ListsPrivate.query();
        
    } else {
        //both buttons are pressed
         $scope.lists=Lists.query();
         $scope.filterPrivate=false;
         $scope.filterPublic=false;
    }
     
}
$scope.filterPublics=function(){
    
    if((!$scope.filterPrivate) && (!$scope.filterPublic)){
        $scope.filterPublic=true;
    $scope.lists=ListsPublic.query();
    } else{
        //both buttons are pressed
         $scope.lists=Lists.query();
         $scope.filterPrivate=false;
         $scope.filterPublic=false;
    } 
}

$scope.resetFilter=function(){
   
    
}

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

      
      $scope.saveTodo = function(){
          var todo=$('#todo_name').val();
          
          var id_name=$('#idlist').val();
         
          var TodoObject=new Todos({description:todo,completed:false});
        // var listObject= $scope.lists[index];
        $scope.TodoList=ListsEdit.get({id:id_name});
        var todoObject;
        if($scope.TodoList.todos===undefined || $scope.TodoList ===undefined){
            todoObject=[TodoObject];
        } else {
         todoObject=$scope.TodoList.todos;
         todoObject[$scope.TodoList.todos.length()]=TodoObject;
        }
        ListsEdit.update({_name:id_name,todos:TodoObject});
        // listObject.todos.push({description:todo,completed:false});
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
        // Lists.update({id:listObject._name,todos:listObject.todos},listObject);
      }

    }])
    
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
    
    .controller('ListControllerPublic',['$scope','ListsPublicAll',function($scope,ListsPublicAll){
    
$scope.lists = ListsPublicAll.query();
     

    }])
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
            controller:'ListControllerCreate'
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