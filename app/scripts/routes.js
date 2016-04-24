'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.view.html',
      data: {
        requireLogin: false
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.view.html',
      data: {
        requireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.view.html',
      controller: 'LoginCtrl',
      data: {
        requireLogin: false
      }
    });
  $urlRouterProvider.otherwise('/');
})


// TODO not working :(
app.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    console.log('stateChangeStart')
    if (toState.data.requireLogin && !$rootScope.loggedIn()) {
      $state.go('home');
      event.preventDefault();
    }
  });
});
