'use strict';

app.controller('DraftCtrl', function ($scope, $rootScope, srvAuth, srvDraft, $websocket) {

  srvDraft.draft.init('test');
  $scope.draft = srvDraft.draft;

  /*var updateState = function () {
    $scope.state = srvDraft.state;
    $scope.user_list = srvDraft.user_list;
    console.log($scope.state);
    //$scope.$apply();
  }*/
  //updateState();
  //srvDraft.registerStateObserver(updateState);




});
