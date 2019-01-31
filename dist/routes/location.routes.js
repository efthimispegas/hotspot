'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

var _requireJwtAuth = require('../utils/requireJwtAuth');

const LocationRoutes = new _express.Router();

//GET requests
LocationRoutes.get('/locations', _requireJwtAuth.requireJwtAuth, _controllers.LocationController.getAllLocations);

LocationRoutes.get('/locations/:locationId', _requireJwtAuth.requireJwtAuth, _controllers.LocationController.getLocation);

LocationRoutes.get('/locations/:locationId/hotspots', _requireJwtAuth.requireJwtAuth, _controllers.LocationController.getLocationHotspots);

//POST requests
LocationRoutes.post('/locations/new', _controllers.LocationController.createLocation);

LocationRoutes.post('/locations/:locationId/hotspots/new', _controllers.LocationController.createLocationHotspot);

exports.default = LocationRoutes;