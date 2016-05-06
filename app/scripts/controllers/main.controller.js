'use strict';

app.controller('MainCtrl', function ($scope, $state, srvAuth) {

  $scope.onlogin = function () {
    $state.go('home');
  };

  $scope.loggedIn = srvAuth.loggedIn;

  $state.go('draft');

});
