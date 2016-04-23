'use strict';



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

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus();

    srvAuth.watchLoginChange();
  };

});

app.factory('srvAuth', function ($rootScope) {

  var service = {};

  service.watchLoginChange = function () {
    var _self = this;
    FB.Event.subscribe('auth.authResponseChange', function (res) {
      if (res.status == 'connected') {
        _self.getUserInfo();
      }
    });
  };

  service.getUserInfo = function () {
    var _self = this;
    FB.api('/me?fields=id,name,email,picture', function (res) {
      $rootScope.$apply(function () {
        $rootScope.user = _self.user = res;
      });
    });
  };

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
