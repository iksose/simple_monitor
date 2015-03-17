// Make sure to include the `ui.router` module as a dependency
var app = angular.module('simple_monitor', [
    'ui.router'
  ])
  .config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('root', {
            url: '/',
            views: {
              'container': {
                templateUrl: 'client/app/home/home.html',
                controller: 'homeCtrl as homeCtrl'
              }
            }
          })
      }
    ]
  );