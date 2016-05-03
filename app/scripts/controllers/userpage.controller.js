'use strict';

app.controller('UserPageCtrl', function ($scope, $rootScope, $http, srvAuth) {

  $scope.user_json = null;

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
});
