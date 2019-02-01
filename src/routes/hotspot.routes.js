import { Router } from 'express';

import { HotspotController } from '../controllers';
import { querySetup } from '../helpers/query.helpers';

const HotspotRoutes = new Router();

//========= GET ============== //

/* GET Hotspots */
HotspotRoutes.get('/hotspots', HotspotController.getAllHotspots);

/* GET Hotspot by id */
HotspotRoutes.get('/hotspots/:hotspotId', HotspotController.getHotspot);

//============= POST ===============//

/* POST Hotspot */
HotspotRoutes.post('/hotspots/new', HotspotController.createHotspot);

export default HotspotRoutes;
