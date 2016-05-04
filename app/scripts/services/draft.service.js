
app.factory('srvDraft', function ($rootScope, srvAuth, $websocket, $http ) {
  var stateObservers = [];

  var draft = {
    state: 'closed'
  }

  draft.init = function (league_id) {
    if (draft.state != 'closed') return;

    draft.state = 'loading';
    draft.league_id = league_id;
    draft.user_list = [];
    draft.players = [];
    draft.picks = [];
    draft.players_left = {};
    draft.picked_players = {};
    draft.picknumber = 0;

    $http({
      method: 'GET',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/players'
    }).success(function (data) {
      draft.players = data;

      draft.state = 'connecting';
      draft.ws = $websocket.$new("ws://"+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/socket")

      draft.ws.$on('$open', function() {
        console.log('open');
        draft.ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': 'test'});
      });

      draft.ws.$on('$message', function(res) {
        draft.state = 'connected';
        draft.notifyStateObservers();
        console.log(res);

        if(res.event == 'user_list') {
          draft.user_list = res.data;
        } else
        if(res.event == 'pick_list') {
          draft.picks = res.data;
          draft.updatePlayersLeft();
        } else
        if(res.event == 'pick') {
          draft.picks.push(res.data);
          draft.updatePlayersLeft();
        }

        $rootScope.$apply();
      });
    });
  }

  draft.updatePlayersLeft = function () {
    draft.picked_players = {};
    for(var i = 0; i < draft.picks.length; i++) {
      draft.picked_players[draft.picks[i].player_id] = true;
    }
    draft.players_left = {};
    for(var i = 0; i < draft.players.length; i++) {
      if (draft.picked_players[draft.players[i]._id]) continue;
      draft.players_left[draft.players[i]._id] = draft.players[i];
    }
  }

  draft.pick = function (player_id) {
    draft.ws.$emit('pick',{'player_id': player_id});
  }

  draft.registerStateObserver = function (callback) { stateObservers.push(callback); }
  draft.notifyStateObservers = function () {angular.forEach(stateObservers, function(callback) {callback();})}


  return {draft: draft};
});
