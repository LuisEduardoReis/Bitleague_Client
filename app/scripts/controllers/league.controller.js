'use strict';

app.controller('LeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth) {

  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+$stateParams.id,
    headers: {'Authorization': srvAuth.login.token}
  }).success(function(data) {
    $scope.league = data;
  })

});

app.controller('NewLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth) {


  $scope.createLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.league_name,

      }

    }).success(function(data) {
      alert("A new league has been created with the following data: " + data);
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});


app.controller('JoinLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth) {


  $scope.createLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.league_id,

      }

    }).success(function(data) {
      alert("A new league has been created with the following data: " + data);
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});
