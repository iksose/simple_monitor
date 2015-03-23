module.exports = class Server {
  constructor(serverName) {
    this.url = serverName
  }
  getStatus() {
    return new Promise((resolve, reject) => {
      resolve("cranked")
    })
  }
}