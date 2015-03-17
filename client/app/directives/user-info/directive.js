angular.module('Camaro')
  .directive('userInfo', function() {
    return {
      restrict: 'EA',
      templateUrl: 'client/app/directives/user-info/template.html',
      controller: function($scope, $element) {
        $scope.name = "name"
      },
      link: function(scope, el, attr) {
        // scope.name = scope.name + "Third ";
      }
    }
  })