angular.module('Camaro')
  .config(
    ['$stateProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('root.protected', {
          url: 'protected',
          views: {
            'container@': {
              templateUrl: 'client/app/protected/protected.html',
              controller: 'protectedCtrl'
            }
          },
          resolve: {
            service: "Secrets",
            getSecrets: function(service) {
              return service.getSecrets();
            }
          }
        })
      }
    ])