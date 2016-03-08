newsFlashApp.controller('studyController', ['$scope', 'db', '$location', function($scope, db, $location) {

var dbPageName = 'myFacts';
var dbUniqueIdName = 'myId';
var cardIndex = 0;
var cards = [];

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

$scope.nextCard = function($event){
  $event.stopPropagation();
  if (cardIndex >= cards.length - 1){
    //cardIndex = cards.length - 1;
    $scope.deckEnd = true;
  } else {
    cardIndex++;
    $scope.side=1;
    $scope.card = cards[cardIndex];
  }

}

$scope.prevCard = function($event){
  $event.stopPropagation();
  cardIndex--;
  if (cardIndex < 0){
    cardIndex = 0;
  }
  $scope.side=2;
  $scope.card = cards[cardIndex];
}

$scope.side = 1;

$scope.toggleSide = function(side){
  $scope.side = side == 1 ? 2 : 1;
}

$scope.factSearch = $location.search();

if (!$scope.factSearch.hasOwnProperty('tags')) {
  $scope.factSearch.tags = [];
}

  $scope.getFacts = function() {
    cards = db.getDBPage(dbPageName);
    cards = db.filterFacts(cards, $scope.factSearch);
    cards = shuffle(cards);

    $scope.card = cards[cardIndex];
  };

  $scope.thumbUp = function($event, card) {
    $event.stopPropagation();
    card.lastTimeUp = new Date();
    card.streakUp = typeof(card.streakUp) == "undefined" ? 1 : card.streakUp + 1;
    card.streakDown = 0;
    var result = db.saveDBRecord(dbPageName, dbUniqueIdName, card);
    $scope.nextCard($event);
  };

  $scope.thumbDown = function($event, card) {
    $event.stopPropagation();
    card.lastTimeDown = new Date();
    card.streakDown = typeof(card.streakDown) == "undefined" ? 1 : card.streakUp + 1;
    card.streakUp = 0;
    var result = db.saveDBRecord(dbPageName, dbUniqueIdName, card);
    $scope.nextCard($event);
    };

  $scope.getFacts();

}]);
