import { Router } from 'express';

import { CommentController } from '../controllers';

const CommentRoutes = new Router();
const base = '/hotspots/:hotspotId';

//============ GET ================/

/* GET Hotspot's comments */
CommentRoutes.get(`${base}/comments`, CommentController.getHotspotComments);

//============== POST =================/

/* POST a Comment on a hotspot */
CommentRoutes.post(`${base}/comments/new`, CommentController.createComment);

export default CommentRoutes;
