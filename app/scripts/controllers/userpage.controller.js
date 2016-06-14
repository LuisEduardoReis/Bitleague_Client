'use strict';

app.controller('UserPageCtrl', function ($scope, $rootScope, $stateParams, $http, srvAuth, $state, toaster) {
  $scope.user_json = null;
  $scope.join_league_id = null;
  $scope.create_league_name = null;
  $scope.create_league_time = null;
  $scope.me = srvAuth.login.user;

  $scope.getLeagues = function () {
    $http({
      method: 'GET',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/leagues',
      headers: {'Authorization': srvAuth.login.token}
    }).success(function(data) {
      $scope.leagues = data;
    });
  };

  $scope.getLeagues();

  if (srvAuth.loggedIn()) {
    $http({
      url: 'http://' + window.location.hostname + ':' + $rootScope.SERVER_PORT + "/api/user?id=" + srvAuth.login.user,
      method: "GET",
      headers: {
        "Authorization": srvAuth.login.token
      }
    }).success(function(data) {
      $scope.user_json = data;
    });
  }

   $scope.delete_league = function(leagueId) {
    $http({
      method: 'DELETE',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+leagueId,
      headers: {'Authorization': srvAuth.login.token}
    }).success(function() {
      $state.reload();
    });
  };


  /* Join League */
  $scope.joinLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        id: $scope.join_league_id
      }

    }).success(function(data) {
      toaster.pop("success", "League " + $scope.join_league_id + " created with success!", "");
      $('#join_league_modal').modal('hide');
      $scope.getLeagues();
    }).error(function(data) {
      toaster.pop("error", data + ". Please try again!", "");
    })
  };
  /* /Join League */


  /* Create League */
  $scope.createLeague = function ()
  {
    if(!$scope.create_league_time)
    {
      toaster.pop("warning", "You must define turn time!", "");
      return;
    }

    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.create_league_name,
        time: parseInt($scope.create_league_time, 10)
      }
    }).success(function(data) {
      toaster.pop("success", "League "+$scope.create_league_name+" was created!", "");
      $('#create_league_modal').modal('hide');
      $scope.getLeagues();
    }).error(function(data) {
      toaster.pop("error", data + ". Please try again!", "");
    })
  };
  /* /Create League */

  /* Share Link */
  $scope.shareLink = function (league_name, league_id) {
    var modal = $('#share_link_modal');
    var url = 'http://'+window.location.hostname+':'+window.location.port + "/#/join_league/" + league_id;
    modal.find('.modal-title').html(league_name);
    modal.find('#league_link').html(url);

    modal.modal('show');
  };
  /* /Share Link */
});
