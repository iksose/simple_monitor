angular.module('simple_monitor')
  .service('Servers', function($http) {
    class ServerService {
      constructor() {
        this.serversList = [];
        this.getServers();
        this.lastRequest;
      }
      getServers() {
        return $http.get('/api/secrets')
          .success((servers) => {
            this.serversList.push(...servers);
            this.lastRequest = Date.now();
          })
      }
      getHealth(url) {
        return $http.get('/api/secrets/' + url)
      }
    }
    var service = new ServerService;
    return service;
  });