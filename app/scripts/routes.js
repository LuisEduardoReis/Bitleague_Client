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
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.view.html',
      data: {
        requireLogin: false,
        requireLogout: false
      }
    })
    .state('drag', {
      url: '/drag',
      templateUrl: 'views/drag.view.html',
      controller: 'DragCtrl',
      data: {
        requireLogin: false,
        requireLogout: false
      }
    })
    .state('sortable', {
      url: '/sortable',
      templateUrl: 'views/sortable.view.html',
      controller: 'sortableController',
      data: {
        requireLogin: false,
        requireLogout: false
      }
    })
    .state('table', {
      url: '/table',
      templateUrl: 'views/table.view.html',
      controller: 'TableCtrl',
      data: {
        requireLogin: false,
        requireLogout: false
      }
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
      url: '/draft/:league_id',
      templateUrl: 'views/draft.view.html',
      controller: 'DraftCtrl',
      data: {
        requireLogin: true,
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


