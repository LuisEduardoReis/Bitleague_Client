'use strict';

app.controller('MainCtrl', function ($scope, srvAuth) {

  $scope.logout = srvAuth.logout;

});
