angular.module('app.lists', ['ngRoute', 'ngResource','app.listsService'])
 .controller('ListController',['$scope','Lists','ListsPrivate','ListsPublic','ListsEdit','Todos',function($scope,Lists,ListsPrivate,ListsPublic,ListsEdit,Todos,user,index){
        
     
$scope.lists = Lists.query();
$scope.todos=Todos.query();
/*
$scope.getTodoPerId=function(id){
   return  $scope.todos.$promise.then(function(todo) {
      return $.grep(todo, function(e){ return e._id == id; });
    });
}*/

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
          //Values from the Modal
          var todo=$('#todo_name').val();
          var id_name=$('#idlist').val();
          
          // Create new Todo in Todo Collection
          TodoObject=new Todos({description:todo,completed:false});
          TodoObject.$save(function(projectResponse){
              // go on here to access the created _id of the new todo
            $scope.todos.push(TodoObject);
          
          // Get the list the todo is for
           ListsEdit.get({id:id_name}).$promise.then(function(data) {
               var todos=data.todos;
                //new flags stored with old todos.
                if( todos.length<1){
                    todos=[projectResponse._id];
                } else {
                    todos[todos.length]=projectResponse._id;
                }
                //update the list
                ListsEdit.update({_name:id_name,todos:todos}).$promise.then(function(){
                    $('#todoModal').modal('hide');
                    $scope.lists=Lists.query();
                    $scope.$apply()
                });
            }); 
          });
      }
    }])
      .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
        .when('/list',{
          templateUrl:'/lists/listsView.html',
          controller:'ListController'
        })
    }]);
    