angular.module('app.lists', ['ngRoute', 'ngResource','app.listsService','app.todosService'])
 .controller('ListController',['$scope','Lists','ListsPrivate','ListsPublic','ListsEdit','Todos','TodosEdit',function($scope,Lists,ListsPrivate,ListsPublic,ListsEdit,Todos,TodosEdit,user,index){
        //$scope.lists=Lists.query();

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
     
    
     var listP = new Lists({ _name: PrivateB ,visibility:"private" ,color:"pink"});

        listP.$update(function(){
            $scope.lists.push(listP);
        })
}
if(!hasWorkB){
     listW = new Lists({ _name: WorkB,visibility:"private",color:"pink" });

       listW.$update(function(){
           $scope.lists.push(listW);
        })
}
if(!hasCurrentDay){
     var listD = new Lists({ _name: CurrentDay,visibility:"private",color:"pink" });

        listD.$update(function(){
            $scope.lists.push(listD);
            })
}
   


});
$scope.todos=Todos.query();
 $scope.lists=Lists.query();
 
 $scope.checkDueDate=function(element){

   //  this.innerHTML = this + " is the element, " + index + " is the position";
   if(element==''){return }
   var d=new Date(element);
   var today=new Date();
   alert(today)
   alert(d);
   if(element =='2016-01-05T23:00:00.000Z'){
       return "red";
   } else {
       return "green";
   }
};


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
        
        var list = new Lists({ _name: $scope.name ,visibility:vis, color:$scope.color});

        list.$update(function(){
          $scope.lists.push(list);
          
        })
        
        window.location.replace('/');
      }
      
        $scope.updateTodo=function(id,complete){
              TodosEdit.update({_id:id, completed:!complete}).$promise.then(function() {
                //  $scope.todos=Todos.query();
                
              });
              
              // window.location.replace('/');
        
        }

      $scope.saveTodo = function(){
          //Values from the Modal
          var todo=$('#todo_name').val();
          var id_name=$('#idlist').val();
          var date=$('#duedatepicker').val();
          alert(date);
          // Create new Todo in Todo Collection
          TodoObject=new Todos({description:todo,completed:false,duedate:new Date(date)});
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
              //  ListsEdit.update({_name:data._name,todos:todos}).$promise.then(function(){
                 data.todos=todos;
                 data.$update(function(){
                    $('#todoModal').modal('hide');
                    $scope.lists=Lists.query();
                    if(!$scope.$$phase) {
  
                    $scope.$apply()
}
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
    