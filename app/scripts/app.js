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
    'ngTouch'
  ]);

app.config(
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.view.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.view.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
