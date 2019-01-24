import { Router } from 'express';

import { HotspotController } from '../controllers';
import { requireJwtAuth } from '../utils/requireJwtAuth';

const HotspotRoutes = new Router();

//GET requests
HotspotRoutes.get(
  '/hotspots',
  requireJwtAuth,
  HotspotController.getAllHotspots
);

HotspotRoutes.get(
  '/hotspots/:hotspotId',
  requireJwtAuth,
  HotspotController.getHotspot
);

//POST requests
HotspotRoutes.post('/hotspots', HotspotController.createHotspot);

export default HotspotRoutes;
