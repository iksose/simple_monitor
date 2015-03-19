angular.module('simple_monitor')
  .directive('masterStatus', function() {
    return {
      restrict: 'EA',
      templateUrl: 'client/app/home/directives/masterStatus/template.html',
      scope: {
        // data: '='
      },
      controller: function($scope) {
        this.allPassing = true;
      },
      controllerAs: 'directiveCtrl'
    };
  })