angular.module('simple_monitor')
  .directive('serverStatus', function(Servers) {
    return {
      restrict: 'A',
      template: `
      <p ng-class="directiveCtrl.isAlive ? 'bg-success' : 'bg-danger'" class='serverStatus'>
          {{data}}
          <i class="fa fa-circle-o-notch fa-spin" ng-show="directiveCtrl.isLoading"></i>
          <i class="fa fa-thumbs-o-up pull-right " ng-show="directiveCtrl.isAlive"></i>
      </p>
        <style>
        p.serverStatus {
          font-size: 2em
        }
        </style>`,
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