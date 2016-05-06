'use strict';

app.controller('TableCtrl', function($scope) {
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term
  
  // create the list of sushi rolls 
  $scope.sushi = [
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