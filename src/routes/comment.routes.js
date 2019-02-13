import { Router } from 'express';

import { CommentController } from '../controllers';

const CommentRoutes = new Router();
const base = '/:userId/hotspots/:hotspotId';

//============ GET ================/

/* GET Hotspot's comments -> will ultimately be the route for the message details page (comments, views etc) */
CommentRoutes.get(`${base}/comments`, CommentController._getHotspotComments);

//============== POST =================/

/* POST a Comment on a hotspot */
CommentRoutes.post(`${base}/comments/new`, CommentController.createComment);

export default CommentRoutes;
