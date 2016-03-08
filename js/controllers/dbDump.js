newsFlashApp.controller('dbDumpController', function($scope) {

  localStorage.removeItem('[object Object]');

  var retVal = {};
  for (i = 0; i < localStorage.length; i++) {
    retVal[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }
  $scope.db = retVal;

});
