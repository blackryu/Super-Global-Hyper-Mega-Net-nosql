  angular.module('app', ['ngRoute', 'ngResource',
  'app.listCreate',
  'app.lists',
  'app.listsPublic',
  'app.listEdit'
  ])
   //---------------
    // Routes
    //---------------
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider        
     
          .otherwise({
          templateUrl:'/lists/listsView.html',
          controller:'ListController'
      });
    }]);