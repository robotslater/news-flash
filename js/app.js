// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var newsFlashApp = angular.module('newsFlashApp', ['ngRoute']);

// configure our routes
newsFlashApp.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // route for the home page
    .when('/', {
    templateUrl: 'views/home.html',
    controller: 'mainController'
  })

  // route for the about page
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'aboutController'
  })

  // route for the about page
  .when('/users', {
    templateUrl: 'views/users.html',
    controller: 'usersController'
  })

  // route for the about page
  .when('/settings', {
    templateUrl: 'views/settings.html',
    controller: 'settingsController'
  })

  // route for the about page
  .when('/study', {
    templateUrl: 'views/study.html',
    controller: 'studyController'
  })

  // route for the about page
  .when('/myFacts', {
    templateUrl: 'views/myFacts.html',
    controller: 'myFactsController',
    caseInsensitiveMatch: true
  })

  // route for the about page
  .when('/myFacts/:myId', {
    templateUrl: 'views/myFactEdit.html',
    controller: 'myFactEditController',
    caseInsensitiveMatch: true
  })

  // route for the about page
  .when('/myFacts/add', {
    templateUrl: 'views/myFactEdit.html',
    controller: 'myFactEditController',
    caseInsensitiveMatch: true
  })

  // route for the fact list page
  .when('/facts', {
    templateUrl: 'views/facts.html',
    controller: 'factsController'
  })

  // route for the fact list page
  .when('/db', {
    templateUrl: 'views/dbDump.html',
    controller: 'dbDumpController'
  })

  // route for the contact page
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'contactController'
  })

  .when('/new', {
    templateUrl: 'views/new.html',
    controller: 'newController'
  })

  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })

  .when('/facts/:id', {
    templateUrl: 'views/new.html',
    controller: 'newController'
  });

  // use the HTML5 History API
  //$locationProvider.html5Mode(true);

});

newsFlashApp.run(function($rootScope, $location, AuthService, $route) {

  var routesOpenToPublic = [];
  angular.forEach($route.routes, function(route, path) {
    // push route onto routesOpenToPublic if it has a truthy publicAccess value
    route.publicAccess && (routesOpenToPublic.push(path));
  });

  $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
    var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
    if (closedToPublic && !AuthService.userIsLoggedIn) {
      $location.path('/login');
    }
  });
})

// create the controller and inject Angular's $scope
newsFlashApp.controller('mainController', ['$scope', 'AuthService', '$timeout',function($scope, AuthService, $timeout) {

  $scope.logout = function() {
    AuthService.logout();
    $scope.refreshCurrectUser();
  };

  $scope.refreshCurrectUser = function() {
    $scope.currentUser = AuthService.currentUser();
    $scope.userIsLoggedIn = AuthService.userIsLoggedIn();
    console.log($scope.currentUser);
  };

  $scope.messages = {}
  $scope.messages.list = [];

  $scope.msgAdd = function(msgObj) {
    var message = {
      type: "info",
      expire: 3000,
      content: "Lorem Ipsum"
    }
    for (var attrname in msgObj) {
      message[attrname] = msgObj[attrname];
    };
    $scope.messages.list.push(message);
    console.log($scope.messages.list);
    $timeout(function() {
      var index = $scope.messages.list.indexOf(message);
      if (index > -1) {
        message.startFade = true;
        $timeout(function(){
            message.hidden = true;
            $scope.messages.list.splice(index, 1);
            console.log($scope.messages.list);
        }, 2000);
      }
    }, message.expire);
  };

  $scope.refreshCurrectUser();


}]);
