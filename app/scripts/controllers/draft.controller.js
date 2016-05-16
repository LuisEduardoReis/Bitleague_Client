'use strict';

app.controller('DraftCtrl', function ($rootScope, $scope, $stateParams, $http, $websocket, srvAuth) {

  $scope.started = false;
  $scope.league_id = $stateParams.id;
  $scope.currentPage = 1;
  $scope.pageSize = 8;
  $scope.sortKey = 'position';

  $scope.state = 'loading';
  $scope.user_list = [];
  $scope.players = [];
  $scope.picks = [];
  $scope.favorites = [];
  $scope.players_left = [];
  $scope.picked_players = {};
  $scope.picknumber = 0;

  $scope.ws = null;

  $scope.timer = -1;
  $scope.currentUser = 'noone';

  $scope.$on("$destroy", function() {
    if ($scope.ws != null) $scope.ws.$close();
    $scope.ws = null;
  });

  $http({
    method: 'GET',
    url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/players'
  }).success(function (data) {
    $scope.players = data;

    $scope.state = 'connecting';
    $scope.ws = $websocket.$new("ws://"+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/socket")
    $scope.ws.$open();

    $scope.ws.$on('$open', function() {
      if ($scope.ws != null) {
        $scope.ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': $scope.league_id});
      }
    });


    $scope.ws.$on('$message', function(res) {
      $scope.state = 'connected';

      if (res == 'close') {
        $scope.state = 'closed'
        $scope.ws.$close();
        $scope.ws = null;
      } else
      if (res.event == 'turn_update') {
        $scope.started = true;
        $scope.timer = res.data.timeLeft;
        $scope.currentUser = res.data.currentUser;
      } else
      if(res.event == 'user_list') {
        $scope.user_list = res.data;
      } else
      if(res.event == 'pick_list') {
        $scope.picks = res.data;
        $scope.updatePlayersLeft();
      } else
      if(res.event == 'pick') {
        $scope.picks.push(res.data);
        $scope.updatePlayersLeft();
      }

      $rootScope.$apply();
    });

    $scope.ws.$on('$close', function() {
      $scope.state='closed';
    });
  });

  $scope.updatePlayersLeft = function () {
    $scope.picked_players = {};
    for(var i in $scope.picks) {
      $scope.picked_players[$scope.picks[i].player_id] = true;
    }
    $scope.players_left = [];
    for(var i in $scope.players) {
      if ($scope.picked_players[$scope.players[i].data_id]) continue;
      $scope.players_left.push($scope.players[i]);
    }
  }

  $scope.pick = function (player_id) {
    $scope.ws.$emit('pick',{'player_id': player_id});
  }

  $scope.sortTable = function(keyname) {
    $scope.sortKey = keyname;
    $scope.reverse = !$scope.reverse;
  }

  $scope.startDraft = function () {
    $http({
      method: 'POST',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/draft/start',
      headers: {"Authorization":srvAuth.login.token},
      data: {"id": $scope.league_id}
    }).error(function(data) { console.log(data)});
  }

  $scope.oneAtATime = false;

});
