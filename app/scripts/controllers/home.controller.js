'use strict';

app.controller('HomeCtrl', function ($scope) {

  $scope.animateElementLeft = function($el) {
    $el.removeClass('my-hidden');
    $el.addClass('animated fadeInLeftBig'); // this example leverages animate.css classes
  };
  $scope.animateElementRight = function($el) {
    $el.removeClass('my-hidden');
    $el.addClass('animated fadeInRightBig'); // this example leverages animate.css classes
  };

  $scope.animateElementOut = function($el) {
    /*$el.addClass('my-hidden');
    $el.removeClass('animated fadeInLeftBig fadeInRightBig'); */
  };

  $scope.login = function () {
    FB.login(function() {}, {scope: 'email,public_profile,user_friends', return_scopes: true});
  };
});
