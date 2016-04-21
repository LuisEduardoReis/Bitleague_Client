'use strict';

/**
 * @ngdoc overview
 * @name bitleagueClientApp
 * @description
 * # bitleagueClientApp
 *
 * Main module of the application.
 */
var app = angular
  .module('bitleagueClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.view.html'
    })
    .when('/about', {
      templateUrl: 'views/about.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function ($rootScope) {
  $rootScope.user = { id: -1 };

  $rootScope.setUser = function(user) { $rootScope.user = user; }
  $rootScope.loggedIn = function() {return $rootScope.user.id > 0}
})

