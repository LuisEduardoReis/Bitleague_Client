'use strict';

app.controller('DraftCtrl', function ($scope,  srvDraft, $stateParams) {

  srvDraft.draft.init($stateParams.id);
  $scope.draft = srvDraft.draft;


});
