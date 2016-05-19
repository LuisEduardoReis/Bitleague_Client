'use strict';

app.controller('LeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {

  $scope.league = null;
  $scope.league_id = $stateParams.id;
  $scope.user = srvAuth.login.user;
  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+$stateParams.id,
    headers: {'Authorization': srvAuth.login.token}
  }).success(function(data) {
    $scope.league = data;
    $scope.usernames = {};
    for(var i in $scope.league.users) {
      var elem = $scope.league.users[i];
      $scope.usernames[elem.id] = elem.name;
    }
  });

  $scope.delete = function() {
    $http({
      method: 'DELETE',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+$stateParams.id,
      headers: {'Authorization': srvAuth.login.token}
    }).success(function() {
      $state.go("userpage");
    });
  }

  $scope.games = [
    { teamA: 'Team 1', winner: 'Team 1', teamB: 'Team 9' },
    { teamA: 'Team 2', winner: 'Team 10', teamB: 'Team 10' },
    { teamA: 'Team 3', winner: 'Team 11', teamB: 'Team 11' },
    { teamA: 'Team 4', winner: 'Team 4', teamB: 'Team 12' },
    { teamA: 'Team 5', winner: 'None', teamB: 'Team 13' },
    { teamA: 'Team 6', winner: 'Team 6', teamB: 'Team 14' },
    { teamA: 'Team 7', winner: 'Team 15', teamB: 'Team 15' },
    { teamA: 'Team 8', winner: 'None', teamB: 'Team 16' }
  ];
});

app.controller('NewLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {


  $scope.createLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.league_name
      }
    }).success(function(data) {
      alert("League "+$scope.league_name+" was created!");
      $state.go("userpage")
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});


app.controller('JoinLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth) {


  $scope.joinLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        id: $scope.league_id
      }

    }).success(function(data) {
      alert("A new league has been created with the following data: " + data);
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});
