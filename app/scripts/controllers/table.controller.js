'use strict';

app.controller('TableCtrl', function($scope) {
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  
  // create the list of sushi rolls 
  $scope.players = [
    { name: 'Player1', team: 'Porto', rank: 2 },
    { name: 'Player2', team: 'Benfica', rank: 2 },
    { name: 'Player3', team: 'Porto', rank: 2 },
    { name: 'Player4', team: 'Sporting', rank: 2 },
    { name: 'Player5', team: 'Sporting', rank: 2 },
    { name: 'Player6', team: 'Benfica', rank: 4 },
    { name: 'Player7', team: 'Porto', rank: 7 },
    { name: 'Player8', team: 'Porto', rank: 6 }
  ];
  
});

