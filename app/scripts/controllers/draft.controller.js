'use strict';

app.controller('DraftCtrl', function ($rootScope, $scope, $stateParams, $http, $websocket, srvAuth) {

  $scope.started = false;
  $scope.league_id = $stateParams.id;
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.sortKey = 'position';
  $scope.state = 'loading';
  $scope.user_list = [];
  $scope.players = [];
  $scope.picks = [];
  $scope.my_picks = [];
  $scope.favorites = [];
  $scope.players_left = [];
  $scope.picked_players = {};
  $scope.picknumber = 0;
  $scope.team = 0;
  $scope.goalkeeper = 0;
  $scope.defense = 0;
  $scope.midfield = 0;
  $scope.forward = 0;
  $scope.owner = false;

  $scope.ws = null;

  $scope.timer = 30;
  $scope.currentUser = 'noone';

  $scope.$on("$destroy", function() {
    if ($scope.ws != null) $scope.ws.$close();
    $scope.ws = null;
  });

  // GET Players
  $http({
    method: 'GET',
    url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/players'
  }).success(function (players) {
  // GET League
  $http({
    method: 'GET',
    url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/league?id=' + $scope.league_id,
    headers: {'Authorization': srvAuth.login.token}
  }).success(function (league) {

    $scope.players = players;
    $scope.me = srvAuth.login.user;
    $scope.league = league;
    $scope.timer = league.turn_time;
    $scope.updateLists();

    $scope.state = 'connecting';
    $scope.ws = $websocket.$new("ws://"+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/socket")
    $scope.ws.$open();

    if($scope.league.creator === $scope.me) $scope.owner = true;

    $scope.ws.$on('$open', function() {
      if ($scope.ws != null) {
        $scope.ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': $scope.league_id});
      }
    });

    $scope.ws.$on('$message', function(res) {
      $scope.state = 'connected';
      //console.log(res);

      if (res == 'close') {
        $scope.state = 'closed';
        $scope.ws.$close();
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
        $scope.updateLists();
      } else
      if(res.event == 'pick') {
        $scope.picks.push(res.data);
        $scope.updateLists();
        //$scope.incrementTeamDisplay(res.data.player_id);
        $scope.updateFavouritesLeft(res.data.player_id);
      } else
      if(res.event == 'favourite') {
        $scope.favorites.push(res.data);
      }
      else
      if(res.event == 'removeFavourite') {
        $scope.updateFavouritesLeft(res.data.player_id);
      }

      $rootScope.$apply();
    });

    $scope.ws.$on('$close', function() {
      $scope.state='closed';
    });

  }).error(function(data) { console.log(data)});
  }).error(function(data) { console.log(data)});


  $scope.incrementTeamDisplay = function(player_id)
  {
    if ($scope.players[player_id].positionDescription == 'Goalkeeper')
      $scope.goalkeeper++;
    else if ($scope.players[player_id].positionDescription == 'Defender')
      $scope.defense++;
    else if ($scope.players[player_id].positionDescription == 'Midfielder')
      $scope.midfield++;
    else if ($scope.players[player_id].positionDescription == 'Forward')
      $scope.forward++;
    $scope.team++;
  };

  $scope.updateLists = function () {
    $scope.picked_players = {};
    for(var i in $scope.picks) {
      $scope.picked_players[$scope.picks[i].player_id] = true;
    }
    $scope.players_left = [];
    for(var i in $scope.players) {
      if ($scope.picked_players[$scope.players[i].data_id]) continue;
      $scope.players_left.push($scope.players[i]);
    }
    $scope.my_picks = [];
    for(var i = 1; i <= 4; i++) $scope.my_picks[i] = [];
    for(var i in $scope.picks) {
      if ($scope.picks[i].user_id == $scope.me) {
        var position = $scope.players[$scope.picks[i].player_id].position;
        $scope.my_picks[position].push($scope.picks[i].player_id);
      }
    }
  };



  $scope.updateFavouritesLeft = function(player_id)
  {
    var temp = [];
    for(var fav in $scope.favorites)
    {
      if($scope.favorites[fav].player_id == player_id) continue;
      temp.push($scope.favorites[fav]);
    }
    $scope.favorites = temp;

  };

  $scope.pick = function (player_id) {
    $scope.ws.$emit('pick',{'player_id': player_id});
  };

  $scope.favourite = function (player_id) {
    $scope.ws.$emit('favourite',{'player_id': player_id});
  };

  $scope.sortTable = function(keyname) {
    $scope.sortKey = keyname;
    $scope.reverse = !$scope.reverse;
  };


  $scope.removeFavourite = function (player_id) {
    $scope.ws.$emit('removeFavourite',{'player_id': player_id});
  };


  $scope.startDraft = function () {
    $http({
      method: 'POST',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/draft/start',
      headers: {"Authorization":srvAuth.login.token},
      data: {"id": $scope.league_id}
    }).error(function(data) { console.log(data)});
  };

  $scope.oneAtATime = false;

  $scope.getGK = function () {
      //console.log ($scope.players)
  }

});
