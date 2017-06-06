'use strict';

angular.module('ticTacToe.controllers.games', ['firebase', 'ngCookies'])  
  .controller('GamesCtrl',
    ['$scope', '$routeParams', '$location', '$cookies', 'angularFireCollection', 'filterFilter',
    function($scope, $routeParams, $location, $cookies, angularFireCollection, filterFilter) {
      $scope.username = $cookies.username;
      $scope.usernameNotEntered = ($scope.username && $scope.username.length > 0) ? false : true;
      watchUsername($scope, $cookies);

      var url = 'https://tictactoe-angular.firebaseio.com/games';
      $scope.activeGames = angularFireCollection(url);
      watchGames($scope, $location, filterFilter);
      // var promise = angularFire(url, $scope, 'games');
      // promise.then(function(games) {
      //   watchGames($scope, $location, filterFilter);
      // });
    }]
  );

function watchUsername($scope, $cookies) {
  $scope.$watch('username', function() {
    $cookies.username = $scope.username;
    $scope.usernameNotEntered = ($scope.username && $scope.username.length > 0) ? false : true;
  });
}

function watchGames($scope, $location, filter) {
  $scope.$watch('activeGames.length', function () {
    $scope.waitingGames = filter($scope.activeGames, function(game) {
      //if (typeof game === 'undefined') $scope.activeGames.splice($scope.activeGames.indexOf(game), 1);
      var player2Undefined = (typeof game.player2 === 'undefined');
      var player1NotCurrentUser = (game.player1 != $scope.username);
      return (player2Undefined && player1NotCurrentUser);
    });

    // purge any games that have ended and been abandoned
    if ($scope.activeGames.length) {
      for (var i in $scope.activeGames) {
        var game = new Game($scope.activeGames[i]);
        if (game.isAbandoned()) {
          $scope.activeGames.remove($scope.activeGames[i]);
        }
      }
    }
  });

  $scope.joinGame = function(game) {
    var game = new Game(game);
    game.addPlayer($scope.username);
    $scope.activeGames.update(game.data);

    $location.path("/games/" + game.data.$id);
  };

  $scope.createGame = function() {
    if (!$scope.username.length) {
      return;
    }

    var game = new Game();
    game.addPlayer($scope.username);
    var id = $scope.activeGames.add(game.data);
    $location.path("/games/" + id);
  };
}
