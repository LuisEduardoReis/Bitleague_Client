'use strict'

app.controller('AdminCtrl', function ($rootScope, $scope, $http) {

  $scope.lockstate = "loading...";

  $scope.loadLockState = function() {
    $http({
      method: 'GET',
      url: 'http://' + window.location.hostname + ':' + $rootScope.SERVER_PORT + '/api/lockstate',
    }).success(function (data) {
      $scope.lockstate = data ? "locked" : "unlocked";
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
      $scope.lockstate = "locked";
    });
    $scope.lockstate = 'loading...';
    console.log("lock");
  }

  $scope.unlock = function() {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/admin/unlock',
    }).success(function(data) {
      $scope.lockstate = "unlocked"
    });
    $scope.lockstate = 'loading...';
    console.log("unlock");
  }

  $scope.load = function(matchday_num) {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/admin/matchday?id='+matchday_num,
    }).success(function(data) {
      console.log(data);
    });
  }
});
