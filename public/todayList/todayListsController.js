angular.module('app.todayList',
               [ 'ngRoute', 'ngResource', 'app.listsPublicService', 'app.listsService', 'app.listEditService' ])
    .controller('ListControllerToday', [
        '$scope',
        'ListsPublicAll',
        'Lists',
        'ListsEdit',
        function($scope, ListsPublicAll, Lists, ListsEdit) {

            var callbacks = {

                getAllListsSuccess :
                    function(data) {

                        console.log("got the following lists");
                        console.log(data);
                        $scope.lists = data;

                    },
                getAllListsError :
                    function(httpResponse) {

                        console.log("error getting the lists");
                        console.log(httpResponse);
                    },

                updateListSuccess :
                    function(reponse) {

                        // TODO notifications?

                    },
                updateListError :
                    function(httpResponse) {

                        console.log("could not update list");
                        console.log(httpResponse);

                    }
            };

            // get all lists
            Lists.query(callbacks.getAllListsSuccess, callbacks.getAllListsError);
            $scope.viewName = "Create you List for Today!";
            // save the indexes of lists that are changed here
            $scope.touchedLists = [];
            $scope.getWeekDay = function() {
                var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                var n = weekday[d.getDay()];
                
                return (d.getMonth() + 1) + '.' + d.getDay() + ' '  + n;
            };
            $scope.newList = {
                _name : 'My list for ' + $scope.getWeekDay(),
                active : true,
                color : "pink",
                visibility : "private",
                todos : { active : [], completed : [] }
            };
            $scope.moveToNewList = function(listIndex, todoIndex) {

                console.log("moving todo");

                var removedTodo = $scope.lists[listIndex].todos.active.splice(todoIndex, 1)[0];
                // add to new list
                $scope.newList.todos.active.push(removedTodo);
                // save the updated list
                $scope.touchedLists.push(listIndex);
            };

            
            
            
            $scope.update = function() {

                var length = $scope.touchedLists.length;
                // update the changed lists
                for(var i = 0; i < length; i++) {

                    // update list
                    ListsEdit.update({},
                                     $scope.lists[$scope.touchedLists[i]],
                                     callbacks.updateListSuccess,
                                     callbacks.updateListError);
                }
                // create the new list
                ListsEdit.update({}, $scope.newList, callbacks.updateListSuccess, callbacks.updateListError);
            };

        }
    ])

    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider

                .when('/todaylist',
                      { templateUrl : '/todayList/todayListView.html', controller : 'ListControllerToday' })
        }
    ]);