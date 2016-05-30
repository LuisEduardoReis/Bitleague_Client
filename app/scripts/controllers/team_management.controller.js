'use strict';

app.controller('TeamCtrl', function($rootScope, $scope, $http, $stateParams, srvAuth) {
  /*
  $scope.goalkeeper = [
  { 'id': 'P01', 'title': 'GK1', 'drag': true }
  ];
  $scope.defense = [
  { 'id': 'P02', 'title': 'DF1', 'drag': true },
  { 'id': 'P03', 'title': 'DF2', 'drag': true },
  { 'id': 'P04', 'title': 'DF3', 'drag': true },
  { 'id': 'P05', 'title': 'DF4', 'drag': true }
  ];
  $scope.midfield = [
  { 'id': 'P06', 'title': 'MF1', 'drag': true },
  { 'id': 'P07', 'title': 'MF2', 'drag': true },
  { 'id': 'P08', 'title': 'MF3', 'drag': true },
  { 'id': 'P09', 'title': 'MF4', 'drag': true }
  ];
  $scope.forward = [
  { 'id': 'P10', 'title': 'FW1', 'drag': true },
  { 'id': 'P11', 'title': 'FW2', 'drag': true }
  ];

  $scope.bench = [
  { 'id': 'P12', 'title': 'GK2', 'drag': true },
  { 'id': 'P13', 'title': 'DF5', 'drag': true },
  { 'id': 'P14', 'title': 'DF6', 'drag': true },
  { 'id': 'P15', 'title': 'MF5', 'drag': true },
  { 'id': 'P16', 'title': 'FW3', 'drag': true },
  { 'id': 'P17', 'title': 'FW4', 'drag': true },
  { 'id': 'P18', 'title': 'FW5', 'drag': true }
  ];*/
  function toDragable(player) { return { 'id': player.data_id, 'title': player.name + " - " + player.positionDescription, 'drag': true };}

  $scope.goalkeeper = [];
  $scope.defense = [];
  $scope.midfield = [];
  $scope.forward = [];
  $scope.bench = [];
  $scope.other = [];

  $http({
    method: "GET",
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/players'
  }).success(function(players) {
  $http({
    method: "GET",
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/team?id='+$stateParams.id,
    headers: {'Authorization': srvAuth.login.token}
  }).success(function(team) {
    console.log(team);

    if (team.hasTeam) {
      for(var player in team.lineup) {
        var playerObj = players[player];
        delete team.players[player];
        switch(team.lineup[player]) {
          case 1: $scope.goalkeeper.push(toDragable(playerObj)); break;
          case 2: $scope.defense.push(toDragable(playerObj)); break;
          case 3: $scope.midfield.push(toDragable(playerObj)); break;
          case 4: $scope.forward.push(toDragable(playerObj)); break;
        }
      }
      for(var player in team.bench) {
        delete team.players[player];
        $scope.bench.push(toDragable(players[player]));
      }
    }

    for(var player in team.players) {
      $scope.other.push(toDragable(players[player]));
    }

    /*
    for(var player in team.players) {
      $scope.bench.push(toDragable(players[player]));
    }*/

  }).error(function (error) {console.log(error);});
  }).error(function (error) {console.log(error);});



  $scope.playersOnField = function(){
    return $scope.goalkeeper.length + $scope.defense.length + $scope.midfield.length + $scope.forward.length;

  }

  // Goalkeeper
  $scope.gk_rest = {
    accept: function() {
      //console.log($scope.playersOnField());
      if ($scope.goalkeeper.length >= 1) {
        return false;
      } else {
        return true;
      }
    }
  };

  // Defense
  $scope.df_rest = {
    accept: function() {
      if($scope.playersOnField() < 11){
        if ($scope.defense.length >= 5) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  // Midfield
  $scope.mf_rest = {
    accept: function() {
      if($scope.playersOnField() < 11){
        if ($scope.midfield.length >= 5) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  // Forward
  $scope.fw_rest = {
    accept: function() {
      if($scope.playersOnField() < 11){
        if ($scope.forward.length >= 5) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
});
