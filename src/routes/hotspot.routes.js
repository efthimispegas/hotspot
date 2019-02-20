import { Router } from 'express';

import { HotspotController } from '../controllers';

const HotspotRoutes = new Router();

//========= GET ============== //

/* GET Hotspots within radius of 5km */
HotspotRoutes.get(
  '/hotspots/radius',
  HotspotController.getHotspotsWithinRadius
);

/* GET Hotspot by id */
HotspotRoutes.get('/hotspots/:hotspotId', HotspotController.getHotspot);

/* GET Hotspots by user id */
HotspotRoutes.get(
  '/users/:userId/hotspots',
  HotspotController._getUserHotspots
);

/* GET all Hotspots */
HotspotRoutes.get('/hotspots', HotspotController.getAllHotspots);

//============= POST ===============//

/* POST Hotspot */
HotspotRoutes.post('/hotspots/new', HotspotController.createHotspot);

export default HotspotRoutes;
