// Make sure to include the `ui.router` module as a dependency
var app = angular.module('Camaro', [
  'ui.router'
])

.run(
    ['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope
          .$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
          });
        $rootScope
          .$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $("#ui-view").html("");
            $(".page-loading").removeClass("hidden");
          });
        $rootScope
          .$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $(".page-loading").addClass("hidden");
          });
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', '$httpProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider) {
        $locationProvider.html5Mode(true);
        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('root', {
            url: '/',
            views: {
              'navigation': {
                templateUrl: 'client/app/navigation/navigation.html',
                controller: 'navCtrl as navCtrl'
              }
              // 'footer': {
              //   templateUrl: 'client/app/vehicles/vehicles.html'
              // }
            }
          })
        $provide.factory('myHttpInterceptor', function($q, $injector) {
          return {
            response: function(response) {
              console.log("Success")
                // do something on success
              return response;
            },
            responseError: function(response) {
              // do something on error
              console.log("Response intercept")
              if (response.status === 401) {
                $injector.get('$state').transitionTo('login');
                return $q.reject(response);
              }
              // console.log(response)
              $injector.get('alertFactory').alerts(response);
              return $q.reject(response);
            }
          };
        });
        $httpProvider.interceptors.push('myHttpInterceptor');
      }
    ]
  );