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
    .state('userpage', {
      url: '/userpage',
      templateUrl: 'views/userpage.view.html',
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


