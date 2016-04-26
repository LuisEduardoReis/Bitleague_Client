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

  service.watchLoginChange = function () {
    var _self = this;
    FB.Event.subscribe('auth.authResponseChange', function (res) {
      if (res.status == 'connected') {
        console.log(res);
        _self.res = res;
        _self.getUserInfo();
      }
    });
  };

  service.getUserInfo = function () {
    var _self = this;
    FB.api('/me?fields=id,name,email,picture', function (res) {
      $rootScope.$apply(function () {
        $rootScope.user = _self.user = res;
        _self.serverLogin();
        $state.go('home');
      });
    });
  };

  service.serverLogin = function () {
    var _self = this;
    console.log(_self);
    $http({
      url: $rootScope.SERVER_URL + "/api/login",
      method: "POST",
      data: {
        id: _self.user.id,
        access_token: _self.res.authResponse.accessToken
      }
    }).success(function (data) {
      _self.token = data;
    });
  }

  service.loggedIn = function () {
    return this.token != null;
  }

  service.logout = function() {
    var _self = this;
    FB.logout(function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = _self.user = {};
      });
    });
  };

  return service;
});
