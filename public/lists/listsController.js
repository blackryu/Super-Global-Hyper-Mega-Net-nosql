angular.module('app.lists', [ 'ngRoute', 'ngResource', 'app.listsService' ])
    .controller('ListController', [
        '$scope',
        'Lists',
        'ListsPrivate',
        'ListsPublic',
        'ListsEdit',
        function($scope, Lists, ListsPrivate, ListsPublic, ListsEdit, Todos, TodosEdit, user, index) {
            //$scope.lists=Lists.query();

            $scope.lists = [];

            var callbacks = {
                
                createTodoSuccess: function(result, responseHeaders){
                    
                     console.log('successfully a todo on list');
                        console.log(result);
                    },
                    
                createTodoError: function(httpResponse){
                    
                    console.log("error creating a new todo");
                    console.log(httpResponse);
                    },    
                    
                updateTodoSucess: function(result, responseHeaders){
                    console.log('successfully updated todo on list');
                    console.log(result);
                },
                
                updateTodoError: function(httpRespones){
                    console.log('error updating a todo');
                    console.log(httpResponse);
                },

                createListSuccess :
                    function(result, responseHeaders) {

                        console.log('successfully created list');
                        console.log(result);
                        $scope.lists.push(result);
                    },

                createListError :
                    function(httpResponse) {

                        console.log('error creating a new list');
                        console.log(httpResponse);
                    },

                getAllListsSuccess :
                    function(data) {

                        // Check for the lists.lists
                        // Private Backlog, Work Backlog. List of day
                        var newLists = [];
                        var tmpLength = 0;
                        var PrivateB = "Private Backlog";
                        var WorkB = "Work Backlog";
                        var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
                        var day = new Date($.now());
                        var CurrentDay = day.getDate() + "." + (day.getMonth() + 1) + " " + days[day.getDay()];
                        var hasPrivateB = false;
                        var hasWorkB = false;
                        var hasCurrentDay = false;

                        $scope.lists = data;

                        for(var i = 0; i < data.length; i++) {

                            if(data[i]._name == PrivateB) {
                                hasPrivateB = true;
                            }
                            if(data[i]._name == WorkB) {
                                hasWorkB = true;
                            }
                            if(data[i]._name == CurrentDay) {
                                hasCurrentDay = true;
                            }
                        };

                        if(!hasPrivateB) {

                            newLists.push({ _name : PrivateB, visibility : "private", color : "pink", todos: 
                            {active:[{duedate: Date('2014-12-08'), description: "test todo 1"}], completed: []} });
                        };

                        if(!hasWorkB) {
                            newLists.push({ _name : WorkB, visibility : "private", color : "pink" });
                        };
                        if(!hasCurrentDay) {
                            newLists.push({ _name : CurrentDay, visibility : "private", color : "pink" });
                        };

                        tmpLength = newLists.length;

                        // create the default lists if needed.
                        for(var i = 0; i < tmpLength; i++) {
                            console.log("creating new default list with params:");
                            console.log(newLists[i]);
                            Lists.update({}, newLists[i], callbacks.createListSuccess, callbacks.createListError);
                        };

                    },
                getAllListsError :
                    function(httpResponse) {

                        console.log("something went bad getting the lists");
                        console.log(httpResponse);
                    }
            };

            Lists.query(callbacks.getAllListsSuccess, callbacks.getAllListsError);

        
    
            $scope.isPublic=function(vis){
                if(vis=='public'){
                    return ' glyphicon-user';
                }
            }
            
            //TODO refactor. maybe use moment js? 
            $scope.checkDueDate = function(element) {
                //  this.innerHTML = this + " is the element, " + index + " is the position";
                if(element === '' || element === null ) {
                    return '';
                }
                var d = new Date(element);
                var today = new Date();
                if( isNaN(d.getTime())){return ;}
                if(d.getDate()==today.getDate() && d.getFullYear()==today.getFullYear() && d.getMonth()==today.getMonth()) {
                    return "warning colorForTodoInfos";
                } else if(d.getFullYear()<=today.getFullYear() || (d.getFullYear()==today.getFullYear() && d.getMonth()<=today.getMonth())
                || (d.getFullYear()==today.getFullYear() && d.getMonth()== today.getMonth() && d.getDate()<today.getMonth())){
                    return "danger colorForTodoInfos";
                }else {
                    return "success colorForTodoInfos";
                }
            };
            
            
            $scope.dateReadable=function(element){
                if(element === '' || element === null ) {
                    return '';
                }
                var d =new Date(element);
                
                if( isNaN(d.getTime())){return ;}
                return ' - '+(d.getMonth() +1)+"/"+d.getDate()+"/"+d.getFullYear(); //getMonth seems to have a 0-count index
            }

            // TODO Who needs this function? why is it in the scope???
            $scope.filterPrivates = function() {
                if((!$scope.filterPrivate) && (!$scope.filterPublic)) {
                    $scope.filterPrivate = true;
                    $scope.lists = ListsPrivate.query();

                } else {
                    // both buttons are pressed
                    $scope.lists = Lists.query();
                    $scope.filterPrivate = false;
                    $scope.filterPublic = false;
                }

            };
            // TODO Who needs this function? why is it in the scope???
            $scope.filterPublics = function() {

                if((!$scope.filterPrivate) && (!$scope.filterPublic)) {
                    $scope.filterPublic = true;
                    $scope.lists = ListsPublic.query();
                } else {
                    // both buttons are pressed
                    $scope.lists = Lists.query();
                    $scope.filterPrivate = false;
                    $scope.filterPublic = false;
                }
            };
            $scope.updateTodo= function(index,indexTodo,active){
                
                if(active){
                    
                var Todo=$scope.lists[index].todos.active[indexTodo];
                $scope.lists[index].todos.active.splice(indexTodo,1);
                $scope.lists[index].todos.completed.push(Todo);
                } else {
                    
                var Todo=$scope.lists[index].todos.complet[indexTodo];
                    $scope.lists[index].todos.completed.splice(indexTodo,1);
                $scope.lists[index].todos.active.push(Todo);
                }
                
                 ListsEdit.update({}, $scope.lists[index], callbacks.updateTodoSuccess, callbacks.updateTodoError);
            }

            $scope.saveTodo = function() {
                
                // TODO two-way-bind this maybe??
                var todo = $('#todo_name').val();
                var id_name = $('#idlist').val();
                var index = $('#idListHidden').val();
                var date = $('#duedatepicker').val();
                var newTodo = {duedate: date, description: todo, completed: false};
                if(!$scope.lists[index].todos){
                  
                    // TODO mongoose should create the empty objects as default. 
                $scope.lists[index].todos = {active: [], completed: []};
                    }
                    
                $scope.lists[index].todos.active.push(newTodo);
                ListsEdit.update({}, $scope.lists[index], callbacks.createTodoSuccess, callbacks.createTodoError);

            };
        }
    ])
    .config([
        '$routeProvider',
        function($routeProvider){ $routeProvider.when(
            '/list',
            { templateUrl : '/lists/listsView.html', controller : 'ListController' }) }
    ]);
