angular.module('simple_monitor')
  .controller('homeCtrl', function(Servers) {
    class HomeCtrl {
      constructor() {
        this.test = ["a"];
        this.servers = Servers.serversList;
      }

    }
    var homeCtrl = new HomeCtrl;
    return homeCtrl;
  })