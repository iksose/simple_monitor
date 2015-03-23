describe('Unit: master status', function() {
  // Load the module with MainController
  beforeEach(module('simple_monitor'));
  beforeEach(module('templates'));

  var ctrl, scope, httpBackend, Servers;
  var tpl;
  var form;
  var elm;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _Servers_, $compile, _$templateCache_) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    // Create the controller
    ctrl = $controller('homeCtrl', {
      $scope: scope
    });
    Servers = _Servers_;
    httpBackend.when('GET', '/api/secrets').respond(200, []);
    httpBackend.flush();
    // var template = _$templateCache_.get('templates/angular/mywidget.html');
  }));

  afterEach(function() {
    // httpBackend.flush()
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  function compileDirective(tpl) {
    // function to compile a fresh directive with the given template, or a default one
    // compile the tpl with the $rootScope created above
    // wrap our directive inside a form to be able to test
    // that our form integration works well (via ngModelController)
    // our directive instance is then put in the global 'elm' variable for further tests
    tpl = '<master-status></master-status>';
    // inject allows you to use AngularJS dependency injection
    // to retrieve and use other services
    inject(function($compile) {
      elm = $compile(tpl)(scope);
    });
    // $digest is necessary to finalize the directive generation
    scope.$digest();
  }

  describe("directive", function() {
    beforeEach(function() {
      compileDirective();
    });
    it('should exist', function() {
      // var hasClass = angular.element(elm.find('div')[0]).hasClass('jumbotron');
      // expect(hasClass).toBe(true);
      expect(elm).toBeDefined();
    });
    it('should have the time since last request', function() {
      var isolateScope = elm.isolateScope().directiveCtrl;
      expect(isolateScope.lastRequest).toBeGreaterThan(1427121077403);
    })
    it('display the last request', function() {
      var isolateScope = elm.isolateScope().directiveCtrl;
    })

  });

})