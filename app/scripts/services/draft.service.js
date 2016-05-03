
app.factory('srvDraft', function (srvAuth, $websocket, $rootScope) {
  var stateObservers = [];

  var draft = {
    state: 'closed'
  }

  draft.init = function (league_id) {
    if (draft.state != 'closed') return;

    draft.state = 'connecting';
    draft.league_id = league_id;
    draft.user_list = [];
    draft.players = [];
    draft.picks = [];

    draft.ws = $websocket.$new("ws://"+window.location.hostname+':'+$rootScope.SERVER_PORT+"/api/socket")

    draft.ws.$on('$open', function() {
      console.log('open');
      draft.ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': 'test'});
    });

    draft.ws.$on('$message', function(res) {
      $rootScope.$apply();
      draft.state = 'connected';
      draft.notifyStateObservers();
      console.log(res);
      if(res.event == 'user_list') {
        draft.user_list = res.data;
      }
    });
  }

  draft.registerStateObserver = function (callback) { stateObservers.push(callback); }
  draft.notifyStateObservers = function () {angular.forEach(stateObservers, function(callback) {callback();})}


  return {draft: draft};
});
