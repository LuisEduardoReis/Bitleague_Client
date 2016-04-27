'use strict';

app.controller('UserPageCtrl', function ($scope, $rootScope, $http, srvAuth) {

  $scope.user_json = null;

  if (srvAuth.loggedIn()) {
    $http({
      url: $rootScope.SERVER_URL + "/api/user?id=" + srvAuth.login.user,
      method: "GET",
      headers: {
        "Authorization": srvAuth.login.token
      }
    }).success(function(data) {
      $scope.user_json = data;
    });
  }
});
