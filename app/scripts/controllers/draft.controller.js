'use strict';

app.controller('DraftCtrl', function ($scope, $rootScope, srvAuth, $websocket) {

  $scope.state = 'connecting';

  var ws = $websocket.$new("ws://"+$rootScope.SERVER_URI+"/socket")

  ws.$on('$open', function() {
    $scope.state = 'connected';
    $rootScope.$apply();

    ws.$emit('init',{'Authorization': srvAuth.token, 'draft': '572359fa5fee9106782d9eb2'});
    ws.$on('$message', function(data) {console.log(data)});
  });


});
