angular.module('app.lists', ['ngRoute', 'ngResource','app.listsService'])
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
      .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
        .when('/list',{
          templateUrl:'/lists/listsView.html',
          controller:'ListController'
        })
    }]);
    