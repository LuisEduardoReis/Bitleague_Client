'use strict';

app.controller('DraftCtrl', function ($scope, $rootScope, srvAuth, srvDraft, $websocket) {

  srvDraft.draft.init('test');
  $scope.draft = srvDraft.draft;


});
