newsFlashApp.controller('myFactsController', ['$scope', 'db', '$location', function($scope, db, $location) {

  var dbPageName = 'myFacts';
  var dbUniqueIdName = 'myId';
  var myFacts;

  $scope.factSearch = {
    tags: [],
    opperator: "and"
  };

  $scope.study = function() {
    $location.path('/study/').search($scope.factSearch);
  };

  $scope.getFacts = function() {
    myFacts = db.getDBPage(dbPageName);
    $scope.myFacts = myFacts;
  };

  $scope.addSearchTag = function(newTag) {
    $scope.factSearch.tags.push(angular.copy(newTag));
  };

  $scope.removeSearchTag = function(i) {
    $scope.factSearch.tags.splice(i, 1);
  };

  $scope.search = function(factSearch) {
    $scope.myFacts = db.filterFacts(myFacts, factSearch);
  };

  $scope.reset = function() {
    $scope.myFacts = myFacts;
    $scope.factSearch = {
      tags: [],
      opperator: $scope.factSearch.opperator
    };
    $scope.newTag = "";
  };

  $scope.view = function(myId) {
    $location.path('/myFacts/' + myId); //.search({id: id});
  };

  $scope.new = function() {
    $location.path('/myFacts/add'); //.search({id: id});
  };

  $scope.delete = function(myId) {
    if (db.deleteDBRecord(dbPageName, dbUniqueIdName, myId)) {
      $scope.getFacts();
    } else {
      var msg = 'error deleting';
      $scope.message = msg;
      console.log(msg);
    }
  };

  $scope.getFacts();

}]);
