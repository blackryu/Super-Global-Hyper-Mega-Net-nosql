angular.module('app.listsPublic', [ 'ngRoute', 'ngResource', 'app.listsPublicService', 'app.listsService' ])
    .controller('ListControllerToday', [
        '$scope',
        'ListsPublicAll',
        'Lists',
        function($scope, ListsPublicAll, Lists, index) {

            // get all lists
            $scope.viewName = "Create you List for Today!"
            $scope.lists = ListsPublicAll.query();
            // save the indexes of lists that are changed here
            $scope.touchedLists = [];

        }
    ])

    .config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider

                .when('/list/todaylist',
                      { templateUrl : '/todayList/todayListView.html', controller : 'ListControllerToday' })
        }
    ]);