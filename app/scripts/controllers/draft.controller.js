'use strict';

app.controller('DraftCtrl', function ($scope,  srvDraft, $stateParams) {
  $scope.currentPage = 1;
  $scope.pageSize = 8;
  
  srvDraft.draft.init($stateParams.league_id);
  $scope.draft = srvDraft.draft;

});
