'use strict';

app.controller('PlayersCtrl', function ($rootScope, $scope, $stateParams, $http, $websocket, srvAuth) {
  $scope.pls = [];
  $scope.currentPage = 1;
  $scope.pageSize = 8;
  $scope.sortKey = 'position';

  $scope.sortTable = function(keyname) {
    $scope.sortKey = keyname;
    $scope.reverse = !$scope.reverse;
  }

  $scope.oneAtATime = false;

  $http({
    method: 'GET',
    url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/players'
  }).success(function (pls) {

    $scope.pls = pls;
    $scope.players = [];
    for(var i in $scope.pls) {
      $scope.players.push($scope.pls[i]);
    }

  }).error(function(data) { console.log(data)});

});
