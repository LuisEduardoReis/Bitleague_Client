'use strict';

app.controller('LeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {

  $scope.league = null;
  $scope.league_id = $stateParams.id;
  $scope.user = srvAuth.login.user;
  $scope.redirect_location = location.host;

  $http({
    method: 'GET',
    url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league?id='+$stateParams.id,
    headers: {'Authorization': srvAuth.login.token}
  }).success(function(data) {
    $scope.league = data;
    $scope.usernames = {};
    for(var i in $scope.league.users) {
      var elem = $scope.league.users[i];
      $scope.usernames[elem.id] = elem.name;
    }

    /* split league matches into array chunks with length 6 */
    $scope.matchesSlides = [];
    var copy = $scope.league.matches;
    for (var i = 0, len = copy.length; i < len; i += 3) {
      $scope.matchesSlides.push(copy.slice(i, i + 3));
    }

    // Calculate match results
    $scope.results = {};
    for(var i in $scope.league.users) {
      $scope.results[$scope.league.users[i].id] = [0,0,0,0];
    }
    for(var i in $scope.league.matches) {
      for(var j in $scope.league.matches[i]) {
        var match = $scope.league.matches[i][j];
        switch(match.result) {
          case 1:
            $scope.results[match.homePlayer][0]++;
            $scope.results[match.homePlayer][3]+=3;
            $scope.results[match.awayPlayer][2]++;
            break;
          case 2:
            $scope.results[match.awayPlayer][0]++;
            $scope.results[match.awayPlayer][3]+=3;
            $scope.results[match.homePlayer][2]++;
            break;
          case 3:
            $scope.results[match.homePlayer][1]++;
            $scope.results[match.homePlayer][3]+=1;
            $scope.results[match.awayPlayer][1]++;
            $scope.results[match.awayPlayer][3]+=1;
            break;
        }
      }
    }
    $scope.resultsArray = [];
    for(var i in $scope.league.users) {
      $scope.resultsArray[i] = {user:$scope.league.users[i].id,name:$scope.league.users[i].name, points: $scope.results[$scope.league.users[i].id][3]};
    }
    $scope.resultsArray.sort(function(a,b) {return b.points-a.points});
  });

  $scope.me = srvAuth.login.user;

  $scope.readyToDraft = function () {
    $http({
      method: 'POST',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/invite/close',
      headers: {"Authorization":srvAuth.login.token},
      data: {"id": $scope.league_id}
    }).success(function(){ $state.go($state.current, {}, {reload: true});})
      .error(function(data) { alert(data)});
  };

  $scope.delete = function () {
    $http({
      method: 'DELETE',
      url: 'http://' + window.location.hostname +':'+ $rootScope.SERVER_PORT +'/api/league?id='+$scope.league_id,
      headers: {"Authorization":srvAuth.login.token},
    }).success(function(data){ $state.go("userpage"); })
      .error(function(data) { console.log(data)});

  }

});

app.controller('BoardCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {

  $scope.me = srvAuth.login.user;



});

app.controller('NewLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth, $state) {


  $scope.createLeague = function ()
  {
    if(!$scope.league_time)
    {
      alert("You must define turn times!");
      return;
    }

    var integer = parseInt($scope.league_time, 10);

    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        name: $scope.league_name,
        time: integer
      }
    }).success(function(data) {
      alert("League "+$scope.league_name+" was created!");
      $state.go("userpage")
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});


app.controller('JoinLeagueCtrl', function ($rootScope, $scope, $stateParams, $http, srvAuth) {


  $scope.joinLeague = function ()
  {
    $http({
      method: 'POST',
      url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
      headers: {'Authorization': srvAuth.login.token},
      data: {
        id: $scope.league_id
      }

    }).success(function(data) {
      alert("A new league has been created with the following data: " + data);
    }).error(function(data) {
      alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
    })
  }

});

app.controller('JoinLeagueUrlCtrl', function ($rootScope, $cookies, $route, $scope, $state, $stateParams, $http) {

  if($cookies.getObject('facebook_login'))
  {
    var facebook_login = $cookies.getObject('facebook_login');

    var temp = location.href.split("/");
    var league_id = temp[temp.length-1];

    $http({
          method: 'POST',
          url: 'http://'+window.location.hostname+':'+$rootScope.SERVER_PORT+'/api/league/user',
          headers: {'Authorization': facebook_login.login.token},
          data: {
            id: league_id
          }

        }).success(function(data) {
          if($cookies.getObject("redirect_value"))
            $cookies.remove("redirect_value");
          $state.go("userpage");
        }).error(function(data) {
          alert("It seems that due to some shenanigans your request has failed, returning such data:" + data);
        });

  }
  else
  {
    var redirect_value = new Array();
    redirect_value.location = "/joinLeague";
    redirect_value.id = $routeParams.id;
    $cookies.putObject("redirect_value", redirect_value);
    //$location.path("/login");
    window.location.href = '/index.html';
  }



});

