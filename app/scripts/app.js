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
    'ui.bootstrap',
    'ngWebsocket',
    'angularUtils.directives.dirPagination'
  ]);


app.run(function ($rootScope, srvAuth, $state) {
  $rootScope.user = { id: -1 };

  $rootScope.setUser = function(user) { $rootScope.user = user; };

  $rootScope.SERVER_PORT = 9090;

});

