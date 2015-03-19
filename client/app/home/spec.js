describe('Unit: homeCtrl', function() {
  // Load the module with MainController
  beforeEach(module('simple_monitor'));

  var ctrl, scope, httpBackend, Servers;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _Servers_) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    // Create the controller
    ctrl = $controller('homeCtrl', {
      $scope: scope
    });
    Servers = _Servers_;
  }));

  afterEach(function() {
    // httpBackend.flush()
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe("Controller initiation", function() {
    it('should get all the servers for the first time', function() {
      var secrets = ['server1', 'sever2'];

      httpBackend.when('GET', '/api/secrets').respond(200, secrets);
      httpBackend.flush();
      expect(ctrl.servers.length).toBe(2);
    });

  });
})