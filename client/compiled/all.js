"use strict";

// Make sure to include the `ui.router` module as a dependency
var app = angular.module("simple_monitor", ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
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

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

angular.module("simple_monitor").controller("homeCtrl", function (Servers) {
  var HomeCtrl = function HomeCtrl() {
    _classCallCheck(this, HomeCtrl);

    this.test = ["a"];
    this.servers = Servers.serversList;
  };

  var homeCtrl = new HomeCtrl();
  return homeCtrl;
});
"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

angular.module("simple_monitor").service("Servers", function ($http) {
  var ServerService = (function () {
    function ServerService() {
      _classCallCheck(this, ServerService);

      this.serversList = [];
      this.getServers();
    }

    _prototypeProperties(ServerService, null, {
      getServers: {
        value: function getServers() {
          var _this = this;

          return $http.get("/api/secrets").success(function (servers) {
            var _serversList;

            (_serversList = _this.serversList).push.apply(_serversList, _toConsumableArray(servers));
          });
        },
        writable: true,
        configurable: true
      },
      getHealth: {
        value: function getHealth(url) {
          return $http.get("/api/secrets/" + url);
        },
        writable: true,
        configurable: true
      }
    });

    return ServerService;
  })();

  var service = new ServerService();
  return service;
});
"use strict";

angular.module("simple_monitor").directive("serverStatus", function (Servers) {
  return {
    restrict: "EA",
    templateUrl: "client/app/home/directives/serverStatus/template.html",
    scope: {
      data: "="
    },
    controller: function controller($scope) {
      this.interval;
      this.init = function () {
        var _this = this;

        this.isLoading = true;
        Servers.getHealth($scope.data).success(function (result) {
          _this.isLoading = false;
          _this.isAlive = result.isAlive;
          clearInterval(_this.interval);
          _this.interval = setInterval(function () {
            _this.init();
          }, 10000);
        });
      };
      this.init();
    },
    controllerAs: "directiveCtrl"
  };
});
"use strict";

angular.module("simple_monitor").directive("masterStatus", function () {
  return {
    restrict: "EA",
    templateUrl: "client/app/home/directives/masterStatus/template.html",
    scope: {},
    controller: function controller($scope) {
      this.allPassing = true;
    },
    controllerAs: "directiveCtrl"
  };
});

// data: '='
//# sourceMappingURL=all.js.map