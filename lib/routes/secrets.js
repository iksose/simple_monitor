"use strict";

module.exports = function (app) {
  var express = require("express");
  var ServerClass = require("../models/servers");
  var serversRouter = express.Router();
  var ping = require("ping");
  var hosts = ["camaro-prod-1.clutchinsurance.com", "camaro-qa-2.clutchinsurance.com", "camaro-qa-3.clutchinsurance.com", "camaro-qa-4.clutchinsurance.com", "camaro-qa-5.clutchinsurance.com"];
  serversRouter.get("/", function (req, res) {
    res.send(hosts);
  });

  serversRouter.post("/", function (req, res) {
    res.status(201).end();
  });

  serversRouter.get("/:serverName", function (req, res) {
    var name = req.params.serverName;
    var server = new ServerClass(name);
    server.getStatus().then(function (data) {
      res.send(data);
    });
  });

  serversRouter.put("/:id", function (req, res) {
    res.send({
      secrets: {
        id: req.params.id
      }
    });
  });

  serversRouter["delete"]("/:id", function (req, res) {
    res.status(204).end();
  });

  app.use("/api/secrets", serversRouter);
};