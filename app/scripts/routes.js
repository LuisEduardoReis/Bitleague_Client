'use strict';

app.run(function ($rootScope, $state, srvAuth) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if((toState.data.requireLogin && !srvAuth.loggedIn()) ||
      (toState.data.requireLogout && srvAuth.loggedIn()) ) {
      $state.go('home');
      event.preventDefault();
    }
  });
});

// Routes

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.view.html',
      data: {
        requireLogin: false,
        requireLogout: false
      }
    })
    .state('league', {
      url: '/league/:id',
      templateUrl: 'views/league.view.html',
      controller: 'LeagueCtrl',
      data: {
        requireLogin: true,
        requireLogout: false
      }
    })
    .state('league.board', {
      url: '/board',
      templateUrl: 'views/board.view.html',
      controller: 'BoardCtrl',
    })
    .state('league.players', {
      url: '/players',
      templateUrl: 'views/players.view.html',
      controller: 'PlayersCtrl',
    })
    .state('league.matches', {
      url: '/matches',
      templateUrl: 'views/matches.view.html',
      controller: 'LeagueCtrl',
    })
    .state('league.team', {
      url: '/team',
      templateUrl: 'views/team.view.html',
      controller: 'TeamCtrl',
    })
    .state('userpage', {
      url: '/userpage',
      templateUrl: 'views/userpage.view.html',
      controller: 'UserPageCtrl',
      data: {
        requireLogin: true,
        requireLogout: false
      }
    })
    .state('draft', {
      url: '/draft/:id',
      templateUrl: 'views/draft.view.html',
      controller: 'DraftCtrl',
      data: {
        requireLogin: true,
        requireLogout: false
      }
    })
    .state('new_league', {
      url: '/new_league',
      templateUrl: 'views/new_league.view.html',
      controller: 'NewLeagueCtrl',
      data: {
        requireLogin: true,
        requireLogout: false
      }
    })
    .state('join_league', {
      url: '/join_league',
      templateUrl: 'views/join_league.view.html',
      controller: 'JoinLeagueCtrl',
      data: {
        requireLogin: true,
        requireLogout: false
      }
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'views/admin.view.html',
      controller: 'AdminCtrl',
      data: {
        requireLogin: false,
        requireLogout: false
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.view.html',
      controller: 'LoginCtrl',
      data: {
        requireLogin: false,
        requireLogout: true
      }
    });
  $urlRouterProvider.otherwise('/');
})


