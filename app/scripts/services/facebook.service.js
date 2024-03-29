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
app.factory('srvAuth', function ($rootScope, $state, $cookies, $http) {

  var service = {};
  service.login = null;
  service.res = null;
  service.user = {id: -1}

  if($cookies.getObject('facebook_login'))
  {
    service = $cookies.getObject('facebook_login');
    $rootScope.user = service.user;
  }


  service.watchLoginChange = function () {
    FB.Event.subscribe('auth.authResponseChange', function (res) {
      if (res.status == 'connected') {
        //console.log(res);
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
      });
    });
  };

  service.serverLogin = function () {
    $http({
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/login",
      method: "POST",
      data: {
        id: service.user.id,
        access_token: service.res.authResponse.accessToken
      }
    }).success(function (data) {
      service.login = data;
      $cookies.putObject('facebook_login', service);

      if($cookies.getObject("redirect_value"))
      {
        var redirect_value = $cookies.getObject("redirect_value");
        window.location.href = redirect_value.location + redirect_value.id;
          //$location.path(redirect_value.location + redirect_value.id);
      }
    });
  }

  service.loggedIn = function () {
    return service.login != null;
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
