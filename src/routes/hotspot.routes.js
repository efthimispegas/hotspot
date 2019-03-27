import { Router } from 'express';

import { HotspotController } from '../controllers';
import { Hotspot } from '../models';

const HotspotRoutes = new Router();

//========= GET ============== //

/* GET Hotspots within radius of 5km */
HotspotRoutes.get(
  '/hotspots/radius',
  HotspotController.getHotspotsWithinRadius
);

/* GET Hotspot by id */
HotspotRoutes.get('/hotspots/:hotspotId', HotspotController.getHotspot);

/* GET Hotspots by user id (paginated) */
HotspotRoutes.get(
  '/users/:userId/hotspots',
  HotspotController._getUserHotspots
);

/* GET all user hotspots */
HotspotRoutes.get(
  '/users/:userId/hotspots/all',
  HotspotController.getAllUserHotspots
);

/* GET all Hotspots */
HotspotRoutes.get('/hotspots', HotspotController.getAllHotspots);

//============= POST ===============//

/* POST Hotspot */
HotspotRoutes.post('/hotspots/new', HotspotController.createHotspot);

//============== PUT =================/

/* EDIT a hotspot */
HotspotRoutes.put(`/hotspots/:hotspotId/edit`, HotspotController.updateHotspot);

//============== DELETE =================/

/* DELETE a hotspot */
HotspotRoutes.delete(
  `/hotspots/:hotspotId/delete`,
  HotspotController.removeHotspot
);

/* DELETE expired Hotspots */
HotspotRoutes.delete(
  '/hotspots/expired',
  HotspotController.removeExpiredHotspots
);

export default HotspotRoutes;
