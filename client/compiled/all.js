"use strict";

// Make sure to include the `ui.router` module as a dependency
var app = angular.module("simple_monitor", ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
  $urlRouterProvider.otherwise("/");

  $stateProvider.state("root", {
    url: "/",
    views: {
      container: {
        templateUrl: "client/app/home/home.html",
        controller: "homeCtrl as homeCtrl"
      }
    }
  });
}]);
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

angular.module("simple_monitor").controller("homeCtrl", function ($http) {
  var HomeCtrl = (function () {
    function HomeCtrl() {
      _classCallCheck(this, HomeCtrl);

      this.ServerStatus = {
        code: 0
      };
    }

    _prototypeProperties(HomeCtrl, null, {
      getStatus: {
        value: function getStatus() {
          $http.get("/api/secrets").then(function () {
            homeCtrl.ServerStatus.code = 200;
          });
        },
        writable: true,
        configurable: true
      }
    });

    return HomeCtrl;
  })();

  var homeCtrl = new HomeCtrl();
  homeCtrl.getStatus();
  return homeCtrl;
});
//# sourceMappingURL=all.js.map