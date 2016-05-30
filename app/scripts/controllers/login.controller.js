'use strict';

app.controller('LoginCtrl', function ($rootScope, $state, $scope, srvAuth) {

  $scope.login = function () {
    FB.login(function() {}, {scope: 'email,public_profile,user_friends', return_scopes: true});    
    $sessionStorage = service.login;
  };

});
