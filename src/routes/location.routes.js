import { Router } from 'express';

import { LocationController } from '../controllers';
import { requireJwtAuth } from '../utils/requireJwtAuth';

const LocationRoutes = new Router();

//GET requests
LocationRoutes.get(
  '/locations',
  requireJwtAuth,
  LocationController.getAllLocations
);

LocationRoutes.get(
  '/locations/:locationId',
  requireJwtAuth,
  LocationController.getLocation
);

LocationRoutes.get(
  '/locations/:locationId/hotspots',
  requireJwtAuth,
  LocationController.getLocationHotspots
);

//POST requests
LocationRoutes.post('/locations/new', LocationController.createLocation);

LocationRoutes.post(
  '/locations/:locationId/hotspots/new',
  LocationController.createLocationHotspot
);

export default LocationRoutes;
