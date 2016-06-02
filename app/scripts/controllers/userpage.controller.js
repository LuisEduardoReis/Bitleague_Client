'use strict';

app.controller('UserPageCtrl', function ($scope, $rootScope, $stateParams, $http, srvAuth, $state) {
  $scope.user_json = null;

  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/leagues',
    headers: {'Authorization': srvAuth.login.token}
  }).success(function(data) {
    $scope.leagues = data;
    console.log($scope.leagues);
  });


  if (srvAuth.loggedIn()) {
    $http({
      url: 'http://' + window.location.hostname + ':' + $rootScope.SERVER_PORT + "/api/user?id=" + srvAuth.login.user,
      method: "GET",
      headers: {
        "Authorization": srvAuth.login.token
      }
    }).success(function(data) {
      $scope.user_json = data;
    });
  }

   $scope.delete_league = function(leagueId) {
    $http({
      method: 'DELETE',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+leagueId,
      headers: {'Authorization': srvAuth.login.token}
    }).success(function() {
      $state.reload();
    });
  }
});
