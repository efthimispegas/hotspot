import { Router } from 'express';

import HotspotRoutes from './hotspot.routes';
import LocationRoutes from './location.routes';
import UserRoutes from './user.routes';

/* GET home page. */
const DefaultRoutes = new Router();
DefaultRoutes.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export { DefaultRoutes, HotspotRoutes, LocationRoutes, UserRoutes };
