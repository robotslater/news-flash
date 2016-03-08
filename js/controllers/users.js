newsFlashApp.controller('usersController', ['$scope', 'db', function($scope, db) {

  var dbPageName = 'users';
  var dbUniqueIdName = 'username';

  $scope.getUsers = function() {
    var users = db.getDBPage(dbPageName);
    $scope.users = users;
  };

  $scope.getUsers();

}]);
