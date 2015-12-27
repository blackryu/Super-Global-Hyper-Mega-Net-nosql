angular.module('app.lists', ['ngRoute', 'ngResource','app.listsService','app.todosService'])
 .controller('ListController',['$scope','Lists','ListsPrivate','ListsPublic','ListsEdit','Todos',function($scope,Lists,ListsPrivate,ListsPublic,ListsEdit,Todos,user,index){
        
     
$scope.lists = Lists.query().$promise.then(function(data) {
    //Check for the lists.lists
// Private Backlog, Work Backlog. List of day 
var PrivateB="Private Backlog";
var WorkB="Work Backlog";
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var day=new Date($.now());
var CurrentDay=day.getDate()+"."+(day.getMonth()+1)+" "+days[ day.getDay() ];
var hasPrivateB=false;
var hasWorkB=false;
var hasCurrentDay=false;
alert('here?');
for(var i=0;i<data.length;i++){
    if(data[i]._name ==PrivateB){
        hasPrivateB=true;
    }
     if(data[i]._name==WorkB){
        hasWorkB=true;
    }
     if(data[i]._name==CurrentDay){
        hasCurrentDay=true;
    }
}
if(!hasPrivateB){
     var listP = new Lists({ _name: PrivateB,  owner: 'test@test.de',color:"pink" ,visibility:"private" });

        listP.$save(function(){
          $scope.lists.push(list);
        });
}
if(!hasWorkB){
     listW = new Lists({ _name: WorkB,  owner: 'test@test.de' ,color:"pink",visibility:"private" });

        listW.$save(function(){
          $scope.lists.push(list);
        });
}
if(!hasCurrentDay){
     var listD = new Lists({ _name: CurrentDay,  owner: 'test@test.de',color:"green",visibility:"private" });

        listD.$save(function(){
          $scope.lists.push(list);
        });
}
if(!hasCurrentDay || !hasWorkB || !hasPrivateB){
    $scope.lists=Lists.query();
}

});
$scope.todos=Todos.query();



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
    