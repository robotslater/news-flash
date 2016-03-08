newsFlashApp.controller('myFactEditController', ['$scope', 'db', '$routeParams', '$location', 'AuthService', function($scope, db, $routeParams, $location, AuthService) {
  var dbPageName = 'myFacts';
  var dbUniqueIdName = 'myId';

  $scope.update = function(myFact) {
    //Update the scope record id if it is a new record.
    //If it an existing record the $scope value will be overwritten by itself
    $scope.myFact.myId = db.saveDBRecord(dbPageName, dbUniqueIdName, myFact);
    $scope.returnToList();
  };

  $scope.delete = function(myFact) {
    if (db.deleteDBRecord(dbPageName, dbUniqueIdName, myFact.myId)) {
      $scope.returnToList();
    } else {
      var msg = 'error deleting';
      $scope.message = msg;
      console.log(msg);
    };

  };

  $scope.reset = function() {
    $scope.myFact = {
      tags:[],
      user: AuthService.currentUser().username
    };
  };

  $scope.returnToList = function(){
    $location.path('/myfacts/')
  };

  $scope.search = function(myId) {
    var queryResult = db.getDBRecord(dbPageName, dbUniqueIdName, myId);
    if (queryResult.success) {
      $scope.myFact = queryResult.record;
      if (!$scope.myFact.hasOwnProperty('tags')) {
        $scope.myFact.tags = [];
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
    $scope.myFact.tags.push(angular.copy(newTag));
  };

  $scope.removeTag = function(i) {
    $scope.myFact.tags.splice(i, 1);
  };

  $scope.search($routeParams.myId);

}]);
