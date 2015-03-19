angular.module('simple_monitor')
  .service('Servers', function($http) {
    class ServerService {
      constructor() {
        this.serversList = [];
        this.getServers();
      }
      getServers() {
        return $http.get('/api/secrets')
          .success((servers) => {
            this.serversList.push(...servers);
          })
      }
      getHealth(url) {
        return $http.get('/api/secrets/' + url)
      }
    }
    var service = new ServerService;
    return service;
  });