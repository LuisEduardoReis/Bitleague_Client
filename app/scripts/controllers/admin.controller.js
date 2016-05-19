'use strict'

app.controller('AdminCtrl', function ($rootScope, $scope, $http) {

  $scope.lockstate = "loading...";

  $scope.loadLockState = function() {
    $http({
      method: 'GET',
      url: 'http://' + window.location.hostname + ':' + $rootScope.SERVER_PORT + '/api/admin/lockstate',
    }).success(function (data) {
      $scope.lockstate = data;
    });
  }
  $scope.loadLockState();

  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/teams',
  }).success(function(data) {
    $scope.teams = data;
  });

  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/matchdays',
  }).success(function(data) {
    $scope.matchdays = data;
  });


  $scope.lock = function() {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/admin/lock',
    }).success(function(data) {
      $scope.matchdays = data;
    });
    $scope.lockstate = 'loading...';
    $scope.loadLockState();
  }

  $scope.unlock = function() {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/admin/unlock',
    }).success(function(data) {
      $scope.matchdays = data;
    });
    $scope.lockstate = 'loading...';
    $scope.loadLockState();
  }
});
