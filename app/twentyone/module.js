angular.module('twentyone', []);

angular.module('twentyone')
  .controller('TwentyOneCtrl', TwentyOneCtrl)
  .config($stateProvider => {
      $stateProvider
        .state('twentyone', {
          url: '/twentyone',
          controller: 'TwentyOneCtrl',
          templateUrl: 'twentyone/twentyone.html',
          controllerAs: 'twentyone'
        });
  });

function TwentyOneCtrl() {
  var bSuit = [".8","25.6","50.4","75.2","99.9"];
  var bVal = ["","0","8.4","16.7","25","33.3","41.6","49.9","58.2","66.5","74.8","83.1","91.4","99.7"];

  this.tests = [4,19,6,45,8,9,50];
  this.card = function(card){
    var value = bVal[Math.floor(card / 4)];
    var suit = bSuit[card % 4];

    return value + "% " + suit + "%";;
  };

  this.rotate = function() {
    return (Math.random() * 10) - 5;
  };
}
