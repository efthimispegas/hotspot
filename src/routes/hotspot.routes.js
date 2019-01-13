import { Router } from 'express';
import { HotspotController } from '../controllers';

const HotspotRoutes = new Router();

//GET requests
HotspotRoutes.get('/hotspots', HotspotController.getAllHotspots);

HotspotRoutes.get('/hotspots/:hotspotId', HotspotController.getHotspot);

//POST requests
HotspotRoutes.post('/hotspots', HotspotController.createHotspot);

export default HotspotRoutes;
