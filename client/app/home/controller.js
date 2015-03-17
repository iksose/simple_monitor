angular.module('simple_monitor')
  .controller('homeCtrl', function(Servers) {
    class HomeCtrl {
      constructor() {
        this.servers = Servers.serversList;
      }

    }
    var homeCtrl = new HomeCtrl;
    return homeCtrl;
  })