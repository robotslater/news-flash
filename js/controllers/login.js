newsFlashApp.controller('loginController', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

  $scope.createUser = function(user) {
    var result = AuthService.createUser(user);
    if (result.success) {
      $scope.refreshCurrectUser();
      //$location.path('/');
    } else {
      $scope.showLoginMsg = true;
      $scope.loginMsg = result.message;
    }
  };

  $scope.login = function(user) {
    var result = AuthService.login(user);
    if (result.success) {
      $scope.refreshCurrectUser();
            //$location.path('/');
    } else {
      $scope.showLoginMsg = true;
      $scope.loginMsg = result.message;
    }
  };

  $scope.logout = function(user) {
    var result = AuthService.logout(user);
    if (result.success) {
      $location.path('/');
    } else {
      $scope.showLoginMsg = true;
      $scope.loginMsg = result.message;
    }
  };

  $scope.removeUser = function(user) {
    var result = AuthService.removeUser(user);
    if (result.success) {
      $scope.user = {};
      $scope.showLoginMsg = true;
      $scope.loginMsg = result.message;
    } else {
      $scope.showLoginMsg = true;
      $scope.loginMsg = result.message;
    }
  };

}]);
