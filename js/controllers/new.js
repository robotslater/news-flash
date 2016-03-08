newsFlashApp.controller('newController', ['$scope', 'db', '$routeParams', '$location', 'AuthService', function($scope, db, $routeParams, $location, AuthService) {
  var dbPageName = 'facts';
  var dbUniqueIdName = 'id';

  $scope.update = function(fact) {
    //Update the scope record id if it is a new record.
    //If it an existing record the $scope value will be overwritten by itself
    
// try {
//   fact.user.username
// } catch(e) {
//
// }

    if (!fact.hasOwnProperty('user') || typeof(fact.user) == 'undefined') {
      var user = AuthService.currentUser();
      if (!user.hasOwnProperty('username')) {
        alert('User is required');
        return false;
      } else {
        fact.user = user.username;
      }
    }
    $scope.fact.id = db.saveDBRecord(dbPageName, dbUniqueIdName, fact);
    $scope.returnToList();
  };

  $scope.delete = function(fact) {
    if (db.deleteDBRecord(dbPageName, dbUniqueIdName, fact.id)) {
      $scope.returnToList();
    } else {
      var msg = 'error deleting';
      $scope.message = msg;
      console.log(msg);
    };

  };

  $scope.reset = function() {
    $scope.fact = {
      tags:[]
    };
  };

  $scope.returnToList = function(){
    $location.path('/facts/')
  };

  $scope.search = function(id) {
    var queryResult = db.getDBRecord(dbPageName, dbUniqueIdName, id);
    if (queryResult.success) {
      $scope.fact = queryResult.record;
      if (!$scope.fact.hasOwnProperty('tags')) {
        $scope.fact.tags = [];
      }
    } else {
      var msg = 'no fact found';
      $scope.message = msg;
      console.log(msg);
      $scope.reset();
    }

  };

  $scope.addTag = function(newTag) {
    if (!$scope.factForm.newTag.$valid){
      console.log('validation error');
      $scope.showNewTagValidate = true;
      return;
    }
    $scope.fact.tags.push(angular.copy(newTag));
  };

  $scope.removeTag = function(i) {
    $scope.fact.tags.splice(i, 1);
  };

  $scope.search($routeParams.id);

}]);
