'use strict';

app.controller('DraftCtrl', function ($scope,  srvDraft, $stateParams) {
  
  srvDraft.draft.init($stateParams.league_id);
  $scope.draft = srvDraft.draft;


});
