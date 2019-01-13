import { Router } from 'express';
import { LocationController } from '../controllers';

const LocationRoutes = new Router();

//GET requests
LocationRoutes.get('/locations', LocationController.getAllLocations);

LocationRoutes.get('/locations/:locationId', LocationController.getLocation);

LocationRoutes.get(
  '/locations/:locationId/hotspots',
  LocationController.getLocationHotspots
);

//POST requests
LocationRoutes.post('/locations/new', LocationController.createLocation);

LocationRoutes.post(
  '/locations/:locationId/hotspots/new',
  LocationController.createLocationHotspot
);

export default LocationRoutes;
