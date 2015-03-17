module.exports = function(app) {
  var express = require('express');
  var secretsRouter = express.Router();
  var ping = require('ping');
  var hosts = ['camaro-prod-1.clutchinsurance.com', 'camaro-qa-2.clutchinsurance.com',
    'camaro-qa-3.clutchinsurance.com', 'camaro-qa-4.clutchinsurance.com', 'camaro-qa-5.clutchinsurance.com'
  ];
  secretsRouter.get('/', function(req, res) {
    res.send(hosts);
  });

  secretsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  secretsRouter.get('/:id', function(req, res) {
    var target = req.params.id;
    if (hosts.indexOf(target) === -1) {
      return res.status(500).end();
    }
    ping.sys.probe(target, function(isAlive) {
      setTimeout(function() {
        res.send({
          url: target,
          isAlive: isAlive
        });
      }, Math.random() * (5000 - 100) + 100);
    });

  });

  secretsRouter.put('/:id', function(req, res) {
    res.send({
      'secrets': {
        id: req.params.id
      }
    });
  });

  secretsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/secrets', secretsRouter);
};