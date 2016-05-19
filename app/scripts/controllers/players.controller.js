'use strict';

app.controller('PlayersCtrl', function ($scope) {

  $scope.currentPage = 1;
  $scope.pageSize = 8;
  $scope.sortKey = 'game_team';

  $scope.sortTable = function(keyname) {
    $scope.sortKey = keyname;
    $scope.reverse = !$scope.reverse;
  }

  $scope.oneAtATime = false;

  $scope.players = [
  {'name': 'Player1', 'positionDescription': 'Guarda-redes', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player2', 'positionDescription': 'Guarda-redes', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player3', 'positionDescription': 'Guarda-redes', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player4', 'positionDescription': 'Defesa', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player5', 'positionDescription': 'Defesa', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player6', 'positionDescription': 'Defesa', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player7', 'positionDescription': 'Defesa', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player8', 'positionDescription': 'Defesa', 'team': 'Sporting', 'game_team': 'TeamB'},
  {'name': 'Player9', 'positionDescription': 'Defesa', 'team': 'Sporting', 'game_team': 'TeamB'},
  {'name': 'Player10', 'positionDescription': 'Defesa', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player11', 'positionDescription': 'Médio', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player12', 'positionDescription': 'Médio', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player13', 'positionDescription': 'Médio', 'team': 'FC Porto', 'game_team': 'TeamB'},
  {'name': 'Player14', 'positionDescription': 'Médio', 'team': 'FC Porto', 'game_team': 'TeamB'},
  {'name': 'Player15', 'positionDescription': 'Médio', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player16', 'positionDescription': 'Médio', 'team': 'Benfica', 'game_team': 'TeamC'},
  {'name': 'Player17', 'positionDescription': 'Médio', 'team': 'Benfica', 'game_team': 'TeamC'},
  {'name': 'Player18', 'positionDescription': 'Médio', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player19', 'positionDescription': 'Médio', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player20', 'positionDescription': 'Avançado', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player21', 'positionDescription': 'Avançado', 'team': 'FC Porto', 'game_team': 'TeamA'},
  {'name': 'Player22', 'positionDescription': 'Avançado', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player23', 'positionDescription': 'Avançado', 'team': 'Benfica', 'game_team': 'TeamB'},
  {'name': 'Player24', 'positionDescription': 'Avançado', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player25', 'positionDescription': 'Avançado', 'team': 'Sporting', 'game_team': 'TeamC'},
  {'name': 'Player26', 'positionDescription': 'Guarda-redes', 'team': 'FC Porto', 'game_team': 'Free Agent'},
  {'name': 'Player27', 'positionDescription': 'Defesa', 'team': 'Benfica', 'game_team': 'Free Agent'},
  {'name': 'Player28', 'positionDescription': 'Médio', 'team': 'Benfica', 'game_team': 'Free Agent'},
  {'name': 'Player29', 'positionDescription': 'Médio', 'team': 'Sporting', 'game_team': 'Free Agent'},
  {'name': 'Player30', 'positionDescription': 'Avançado', 'team': 'Sporting', 'game_team': 'Free Agent'}

  ];

});
