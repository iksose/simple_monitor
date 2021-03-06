angular.module('simple_monitor')
  .directive('serverStatus', function(Servers) {
    return {
      restrict: 'EA',
      templateUrl: 'client/app/home/directives/serverStatus/template.html',
      scope: {
        data: '='
      },
      controller: function($scope) {
        this.interval;
        this.init = function() {
          this.isLoading = true;
          Servers.getHealth($scope.data)
            .then((result) => {
              this.isLoading = false;
              this.isAlive = result.pingStatus
              clearInterval(this.interval);
              this.interval = setInterval(() => {
                this.init();
              }, 600000)
            })
        }
        this.init();
      },
      controllerAs: 'directiveCtrl',
    };
  })
  .directive('detailedInfo', function(Servers) {
    return {
      restrict: 'EA',
      require: '^serverStatus',
      templateUrl: 'client/app/home/directives/serverStatus/details.html',
      scope: false,
      controller: function($scope) {
        var parentCtrl = $scope.$parent.directiveCtrl;
      },
      link: function(scope, elem, attrs, controllerInstance) {},
      controllerAs: 'detailedInfoCtrl'
    };
  })