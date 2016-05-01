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
    'ui.router',
    'ngDragDrop',
    'ui.sortable',
    'ngWebsocket'
  ]);


app.run(function ($rootScope, srvAuth, $state) {
  $rootScope.user = { id: -1 };

  $rootScope.setUser = function(user) { $rootScope.user = user; };

  $rootScope.SERVER_URI = "localhost:9090"
  $rootScope.SERVER_URL = "http://" + $rootScope.SERVER_URI;


});

