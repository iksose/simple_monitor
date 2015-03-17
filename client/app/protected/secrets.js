angular.module('Camaro')
  .service('Secrets', function($http) {
    var SecretClass = function() {
      this.getSecrets = function() {
        return $http.get('/api/secrets')
      }
    }

    var Secrets = new SecretClass();

    return Secrets;
  });