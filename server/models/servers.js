var ping = require('ping');
var co = require('co');
var request = require('request-promise');
module.exports = class Server {
  constructor(serverName) {
    this.url = serverName;
    this.databaseConnection = false
  }
  getStatus() {
    return co(function*() {
      var res = yield [this.checkDB(), this.ping(), this.checkServer()]
      return this;
    }.bind(this))
  }
  checkDB() {
    return request(`http://${this.url}/quote`)
      .then((data) => {
        data = JSON.parse(data);
        // effective_date is completely arbitrary
        if (data.hasOwnProperty('effective_date')) {
          this.databaseConnection = true;
        }
      });
  }
  ping() {
    return new Promise((resolve, reject) => {
      ping.sys.probe(this.url, (isAlive) => {
        this.pingStatus = isAlive;
        resolve();
      })
    })
  }
  checkServer() {
    // TODO go to digital ocean API
    return new Promise((resolve, reject) => {
      this.serverStatus = true;
      resolve();
    })
  }
}