'use strict';

app.controller('DraftCtrl', function ($scope, $rootScope, srvAuth, $websocket) {

  $scope.draft_state = 'connecting';
  $scope.draft_user_list = [];

  var ws = $websocket.$new("ws://"+$rootScope.SERVER_URI+"/api/socket")

  ws.$on('$open', function() {
    console.log("open");
    $scope.$apply();
    
    ws.$emit('init',{'Authorization': srvAuth.login.token, 'league_id': 'test'});
    
    ws.$on('$message', function(res) {
      $scope.draft_state = 'connected';
      console.log(res);
      if(res.event == 'user_list') {
        $scope.draft_user_list = res.data;
      }
      $scope.$apply();
    });
    
  });


});
