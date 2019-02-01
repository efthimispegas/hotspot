'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

var _requireJwtAuth = require('../utils/requireJwtAuth');

const HotspotRoutes = new _express.Router();
const collectionName = 'hotspot';

//GET requests

/* GET Hotspots */
HotspotRoutes.get('/hotspots', function (req, res) {
  const { db } = req;
  const collection = db.get(collectionName);
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
});

// HotspotRoutes.get(
//   '/hotspots',
//   // requireJwtAuth,
//   HotspotController.getAllHotspots
// );

HotspotRoutes.get('/hotspots/:hotspotId',
// requireJwtAuth,
_controllers.HotspotController.getHotspot);

//POST requests

/* POST to Add User Service */
HotspotRoutes.post('/hotspots', _controllers.HotspotController.createHotspot);

// HotspotRoutes.post('/hotspots', HotspotController.createHotspot);

exports.default = HotspotRoutes;