newsFlashApp.controller('factsController', ['$scope', 'db', '$location', function($scope, db, $location) {

  var dbPageName = 'facts';
  var dbUniqueIdName = 'id';

  $scope.factSearch = {
    tags: [],
    opperator: "and"
  };

  var queryStringObj = $location.search();

  for (var attrname in queryStringObj) {
    $scope.factSearch[attrname] = queryStringObj[attrname];
  };

  $scope.getSearches = function() {
    $scope.savedSearches = db.getDBPage('searches');
    if (queryStringObj.hasOwnProperty('id')){
      var i = $scope.getSavedSearchIndexById(queryStringObj['id']);
      $scope.savedSearch = $scope.savedSearches[i];
    }
  };

  $scope.getSavedSearchIndexById = function (id){
    for (i=0;i<$scope.savedSearches.length;i++){
      if ($scope.savedSearches[i].id == id) {
        return i;
        break;
      }
    }
  };

  $scope.updateFactSearch = function() {
    $scope.factSearch = angular.copy($scope.savedSearch);
    $scope.search();
  };

  $scope.modalSavedSearch = {
    show:false
  };

  $scope.saveSearchAs = function() {
  //   if (typeof($scope.factSearch.name) != "undefined" && $scope.factSearch.name.length > 0){
  //   $scope.factSearch.name = $scope.factSearch.name + " Copy"
  // }
  $scope.modalSavedSearch.show = true;
  };

  $scope.saveSearch = function() {
    if (typeof($scope.factSearch.name) == "undefined" || $scope.factSearch.name.length <= 0){
      $scope.modalSavedSearch.show = true;
    } else {
      var result = db.saveDBRecord('searches', 'id', $scope.factSearch);
      $scope.getSearches();
      var i = $scope.getSavedSearchIndexById(result);
      $scope.savedSearch = $scope.savedSearches[i]
      $scope.modalSavedSearch.show = false;
    }
  };

  $scope.modalFork = {
    show: false
  };

  $scope.getFacts = function() {
    var facts = db.getDBPage(dbPageName);
    $scope.facts = db.filterFacts(facts, $scope.factSearch);
  };

  $scope.addSearchTag = function(newTag) {
    $scope.factSearch.tags.push(angular.copy(newTag));
  };

  $scope.removeSearchTag = function(i) {
    $scope.factSearch.tags.splice(i, 1);
  };

  $scope.search = function() {
    $location.path('/facts/').search($scope.factSearch);
  };

  $scope.reset = function() {
    $scope.factSearch = {
      tags: [],
      opperator:"and"
    };
    $scope.savedSearch = {};
    $scope.search();
  };

  $scope.view = function(id) {
    $location.path('/facts/' + id); //.search({id: id});
  };

  $scope.fork = function(fact) {
    var result = db.saveDBRecord('myFacts', 'myId', fact);
    $scope.modalFork = {
      show: true,
      myId: result
    }
  };

  $scope.viewMyFacts = function() {
    $location.path('/myFacts/');
  };

  $scope.editMyFact = function(myId) {
    $location.path('/myFacts/' + myId);
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

  $scope.getSearches();

  $scope.msgAdd({});

}]);
