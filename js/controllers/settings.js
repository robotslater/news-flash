newsFlashApp.controller('settingsController', ['$scope', 'db', '$location', function($scope, db, $location) {
var dbPageName = 'facts';

  $scope.getFacts = function() {
    var facts = db.getDBPage(dbPageName);
    $scope.facts = facts;
  };

  $scope.view = function(id) {
    $location.path('/facts/'+id);//.search({id: id});
  };

  $scope.delete = function(id) {
    if (db.deleteDBRecord(dbPageName, dbUniqueIdName, id)) {
      $scope.getFacts();
    } else {
      var msg = 'error deleting';
      $scope.message = msg;
      console.log(msg);
    }
  };

  $scope.getFacts();

}]);
