'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

var _requireJwtAuth = require('../utils/requireJwtAuth');

const HotspotRoutes = new _express.Router();

//GET requests
HotspotRoutes.get('/hotspots', _requireJwtAuth.requireJwtAuth, _controllers.HotspotController.getAllHotspots);

HotspotRoutes.get('/hotspots/:hotspotId', _requireJwtAuth.requireJwtAuth, _controllers.HotspotController.getHotspot);

//POST requests
HotspotRoutes.post('/hotspots', _controllers.HotspotController.createHotspot);

exports.default = HotspotRoutes;