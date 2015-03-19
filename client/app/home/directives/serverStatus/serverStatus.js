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
            .success((result) => {
              this.isLoading = false;
              this.isAlive = result.isAlive
              clearInterval(this.interval);
              this.interval = setInterval(() => {
                this.init();
              }, 10000)
            })
        }
        this.init();
      },
      controllerAs: 'directiveCtrl'
    };
  })