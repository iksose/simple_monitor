"use strict";

// Make sure to include the `ui.router` module as a dependency
var app = angular.module("Camaro", ["ui.router"]).run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {

  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$on("$stateNotFound", function (event, unfoundState, fromState, fromParams) {
    console.log(unfoundState.to); // "lazy.state"
    console.log(unfoundState.toParams); // {a:1, b:2}
    console.log(unfoundState.options); // {inherit:false} + default options
  });
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    $("#ui-view").html("");
    $(".page-loading").removeClass("hidden");
  });
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $(".page-loading").addClass("hidden");
  });
}]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$provide", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider) {
  $locationProvider.html5Mode(true);
  // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
  $urlRouterProvider.otherwise("/");

  $stateProvider.state("root", {
    url: "/",
    views: {
      navigation: {
        templateUrl: "client/app/navigation/navigation.html",
        controller: "navCtrl as navCtrl"
      }
      // 'footer': {
      //   templateUrl: 'client/app/vehicles/vehicles.html'
      // }
    }
  });
  $provide.factory("myHttpInterceptor", function ($q, $injector) {
    return {
      response: (function (_response) {
        var _responseWrapper = function response(_x) {
          return _response.apply(this, arguments);
        };

        _responseWrapper.toString = function () {
          return _response.toString();
        };

        return _responseWrapper;
      })(function (response) {
        console.log("Success");
        // do something on success
        return response;
      }),
      responseError: function responseError(response) {
        // do something on error
        console.log("Response intercept");
        if (response.status === 401) {
          $injector.get("$state").transitionTo("login");
          return $q.reject(response);
        }
        // console.log(response)
        $injector.get("alertFactory").alerts(response);
        return $q.reject(response);
      }
    };
  });
  $httpProvider.interceptors.push("myHttpInterceptor");
}]);
"use strict";

angular.module("Camaro").controller("protectedCtrl", function () {
  console.log("protectedCtrl loaded");
});
"use strict";

angular.module("Camaro").config(["$stateProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state("root.protected", {
    url: "protected",
    views: {
      "container@": {
        templateUrl: "client/app/protected/protected.html",
        controller: "protectedCtrl"
      }
    },
    resolve: {
      service: "Secrets",
      getSecrets: function getSecrets(service) {
        return service.getSecrets();
      }
    }
  });
}]);
"use strict";

angular.module("Camaro").service("Secrets", function ($http) {
  var SecretClass = function SecretClass() {
    this.getSecrets = function () {
      return $http.get("/api/secrets");
    };
  };

  var Secrets = new SecretClass();

  return Secrets;
});
"use strict";

angular.module("Camaro").controller("navCtrl", function () {
  console.log("navCtrl loaded");
});
"use strict";

angular.module("Camaro").controller("vehiclesController", function () {
  console.log("controller loaded");
});
"use strict";

angular.module("Camaro").service("Auth", function ($http) {
  var AuthClass = function AuthClass() {
    this.isAuthed = function () {
      return new Promise(function (resolve, reject) {
        resolve("yay");
      });
    };
  };

  var Auth = new AuthClass();

  return Auth;
});
"use strict";

angular.module("Camaro").directive("userInfo", function () {
  return {
    restrict: "EA",
    templateUrl: "client/app/directives/user-info/template.html",
    controller: function controller($scope, $element) {
      $scope.name = "name";
    },
    link: function link(scope, el, attr) {}
  };
});

// scope.name = scope.name + "Third ";
//# sourceMappingURL=all.js.map