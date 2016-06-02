'use strict';

app.controller('LeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {

  $scope.league = null;
  $scope.league_id = $stateParams.id;
  $scope.user = srvAuth.login.user;
  $scope.redirect_location = location.host;

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
    //console.log($scope.league);
  });

  $scope.me = srvAuth.login.user;

  $scope.readyToDraft = function () {
    $http({
      method: 'POST',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/invite/close',
      headers: {"Authorization":srvAuth.login.token},
      data: {"id": $scope.league_id}
    }).success(function(){ $state.go($state.current, {}, {reload: true});})
      .error(function(data) { alert(data)});
  };

  $scope.delete = function () {
    $http({
      method: 'DELETE',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/league?id='+$scope.league_id,
      headers: {"Authorization":srvAuth.login.token},
    }).success(function(data){ $state.go("userpage"); })
      .error(function(data) { console.log(data)});

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
    if(!$scope.league_time)
    {
      alert("You must define turn times!");
      return;
    }

    var integer = parseInt($scope.league_time, 10);

    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.league_name,
        time: integer
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

app.controller('JoinLeagueUrlCtrl', function ($rootScope, $cookies, $route, $scope, $state, $stateParams, $http) {

  if($cookies.getObject('facebook_login'))
  {
    var facebook_login = $cookies.getObject('facebook_login');

    var temp = location.href.split("/");
    var league_id = temp[temp.length-1];

    $http({
          method: 'POST',
          url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
          headers: {'Authorization': facebook_login.login.token},
          data: {
            id: league_id
          }

        }).success(function(data) {
          if($cookies.getObject("redirect_value"))
            $cookies.remove("redirect_value");
          $state.go("userpage");
        }).error(function(data) {
          alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
        });

  }
  else
  {
    var redirect_value = new Array();
    redirect_value.location = "/joinLeague";
    redirect_value.id = $routeParams.id;
    $cookies.putObject("redirect_value", redirect_value);
    //$location.path("/login");
    window.location.href = '/index.html';
  }



});

