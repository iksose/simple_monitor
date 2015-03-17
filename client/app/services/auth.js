angular.module('Camaro')
  .service('Auth', function($http) {
    var AuthClass = function() {
      this.isAuthed = function() {
        return new Promise((resolve, reject) => {
          resolve("yay")
        })
      }
    }

    var Auth = new AuthClass();

    return Auth;
  });