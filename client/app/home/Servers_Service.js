angular.module('simple_monitor')
  .service('Servers', function($http) {
    class ServerService {
      constructor() {
        this.serversList = [];
        this.getServers();
        this.lastRequest = {
          UTC: Date.now()
        };
      }
      getServers() {
        return $http.get('/api/secrets')
          .success((servers) => {
            this.serversList.push(...servers);
          })
      }
      getHealth(url) {
        return $http.get('/api/secrets/' + url)
          .then((data) => {
            this.lastRequest.UTC = Date.now();
            return data.data;
          })
      }
    }
    var service = new ServerService;
    return service;
  });