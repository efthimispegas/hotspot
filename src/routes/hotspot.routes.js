import { Router } from 'express';

import { HotspotController } from '../controllers';
import { requireJwtAuth } from '../utils/requireJwtAuth';

const HotspotRoutes = new Router();
const collectionName = 'hotspot';

//GET requests

/* GET Hotspots */
HotspotRoutes.get('/hotspots', function(req, res) {
  const { db } = req;
  const collection = db.get(collectionName);
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

// HotspotRoutes.get(
//   '/hotspots',
//   // requireJwtAuth,
//   HotspotController.getAllHotspots
// );

HotspotRoutes.get(
  '/hotspots/:hotspotId',
  // requireJwtAuth,
  HotspotController.getHotspot
);

//POST requests

/* POST to Add User Service */
HotspotRoutes.post('/hotspots', HotspotController.createHotspot);

// HotspotRoutes.post('/hotspots', HotspotController.createHotspot);

export default HotspotRoutes;
