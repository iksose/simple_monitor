angular.module('simple_monitor')
  .controller('homeCtrl', function($http) {
    class HomeCtrl {
      constructor() {
        this.ServerStatus = {
          code: 0
        };
      }
      getStatus() {
        $http.get('/api/secrets').then(() => {
          homeCtrl.ServerStatus.code = 200;
        })
      }
    }
    var homeCtrl = new HomeCtrl;
    homeCtrl.getStatus();
    return homeCtrl;
  })