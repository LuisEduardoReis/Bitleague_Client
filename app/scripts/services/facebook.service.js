'use strict';


// Init
app.run(function ($rootScope, $window, srvAuth) {

  $rootScope.user = {id: -1}

  window.fbAsyncInit = function () {
    FB.init({
      appId: '1001329453281741',
      cookie: true,  // enable cookies to allow the server to access
                     // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.5' // use graph api version 2.5
    });

    FB.getLoginStatus();

    srvAuth.watchLoginChange();
  };
});


// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));


// Create a authentication service
app.factory('srvAuth', function ($rootScope, $state, $http) {

  var service = {};
  service.token = null;
  service.res = null;
  service.user = {id: -1}

  service.watchLoginChange = function () {
    FB.Event.subscribe('auth.authResponseChange', function (res) {
      if (res.status == 'connected') {
        service.res = res;
        service.getUserInfo();
      }
    });
  };

  service.getUserInfo = function () {
    FB.api('/me?fields=id,name,email,picture', function (res) {
      $rootScope.$apply(function () {
        $rootScope.user = service.user = res;
        service.serverLogin();
        $state.go('home');
      });
    });
  };

  service.serverLogin = function () {
    $http({
      url: $rootScope.SERVER_URL + "/api/login",
      method: "POST",
      data: {
        id: service.user.id,
        access_token: service.res.authResponse.accessToken
      }
    }).success(function (data) {
      service.token = data;
    });
  }

  service.loggedIn = function () {
    return service.token != null;
  }

  service.logout = function() {
    FB.logout(function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = service.user = {};
      });
    });
  };

  return service;
});
