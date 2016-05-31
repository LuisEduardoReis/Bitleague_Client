'use strict';

app.controller('LoginCtrl', function ($rootScope, $state, $scope, srvAuth) {


  $scope.login = function () {
    FB.login(function() {}, {scope: 'email,public_profile,user_friends', return_scopes: true});    
    $sessionStorage = service.login;
    

	if($cookies.getObject("redirect_value"))
  	{
  		var redirect_value = $cookies.getObject("redirect_value");
  		window.location.href = redirect_value.location + redirect_value.id;
        //$location.path(redirect_value.location + redirect_value.id);
  	}
  	else
  		window.location.href = "/userpage";
  };


});
