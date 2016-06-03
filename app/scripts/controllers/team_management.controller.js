'use strict';

app.controller('TeamCtrl', function($rootScope, $scope, $http, $stateParams, srvAuth) {

  function toDragable(player) { return { 'id': player.data_id, 'title': player.name + " - " + player.positionDescription, 'drag': true };}

  $scope.loaded = false;
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
    //console.log(team);
    $scope.loaded = true;

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

  }).error(function (error) {console.log(error);});
  }).error(function (error) {console.log(error);});

  $scope.saveTeam = function() {
    var lineup = {}, bench = [];
    for(var i in $scope.goalkeeper) lineup[$scope.goalkeeper[i].id] = 1;
    for(var i in $scope.defense) lineup[$scope.defense[i].id] = 2;
    for(var i in $scope.midfield) lineup[$scope.midfield[i].id] = 3;
    for(var i in $scope.forward) lineup[$scope.forward[i].id] = 4;
    for(var i in $scope.bench) bench.push($scope.bench[i].id);

    $http({
      method: "PUT",
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/team',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        league_id: $scope.league_id,
        lineup: lineup,
        bench: bench
      }
    }).success(function(data) {alert("Saved!");})
      .error(function (error) {alert(error);});
  }

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
