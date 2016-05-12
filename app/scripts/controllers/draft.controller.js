'use strict';

app.controller('DraftCtrl', function ($rootScope, $scope, $stateParams, $http, $websocket, srvAuth) {

  $scope.state = 'closed';
  $scope.started = false;
  $scope.league_id = $stateParams.id;

  $scope.state = 'loading';
  $scope.user_list = [];
  $scope.players = [];
  $scope.picks = [];
  $scope.shortList = [];
  $scope.players_left = {};
  $scope.picked_players = {};
  $scope.picknumber = 0;

  $scope.timer = 0;
  $scope.currentUser = "";

  $http({
    method: 'GET',
    url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/players'
  }).success(function (data) {
    $scope.players = data;

    $scope.state = 'connecting';
    $scope.ws = $websocket.$new("ws://"+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/socket")

    $scope.ws.$on('$open', function() {
      console.log('open');
      $scope.ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': $scope.league_id});
    });

    $scope.ws.$on('$message', function(res) {
      $scope.state = 'connected';
      console.log(res);

      if (res == 'close') {
        $scope.state = 'closed'
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
      } else
      if(res.event == 'shorlist_update') {
        $scope.shortList.push(res.data);
        $scope.updatePlayersLeft();
      }

      $rootScope.$apply();
    });

    $scope.ws.$on('$close', function() {
      draft.state='closed';
    })
  });

  $scope.updatePlayersLeft = function () {
    $scope.picked_players = {};
    for(var i in $scope.picks) {
      $scope.picked_players[$scope.picks[i].player_id] = true;
    }
    $scope.players_left = {};
    for(var i in $scope.players) {
      if ($scope.picked_players[$scope.players[i]._id]) continue;
      $scope.players_left[$scope.players[i]._id] = $scope.players[i];
    }
  }

  $scope.pick = function (player_id) {
    $scope.ws.$emit('pick',{'player_id': player_id});
  }


  $scope.removeFromShortList = function (player_id) {
    //$scope.ws.$emit('pick',{'player_id': player_id});
  }


  $scope.startDraft = function () {
    $http({
      method: 'POST',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/draft/start',
      headers: {"Authorization":srvAuth.login.token},
      data: {"id": $scope.league_id}
    }).then(function(data) { console.log(data)});
  }

});
