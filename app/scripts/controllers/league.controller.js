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
