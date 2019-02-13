import { Router } from 'express';

import HotspotRoutes from './hotspot.routes';
import UserRoutes from './user.routes';
import CommentRoutes from './comment.routes';
import FileRoutes from './file.routes';

/* GET home page. */
const DefaultRoutes = new Router();
DefaultRoutes.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export { DefaultRoutes, HotspotRoutes, UserRoutes, CommentRoutes, FileRoutes };
