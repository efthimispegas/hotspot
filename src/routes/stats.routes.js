import { Router } from 'express';

import { StatsController } from '../controllers';

const StatsRoutes = new Router();

//================ GET ==================//

StatsRoutes.get('/stats/users', StatsController.getTotalUsers);
StatsRoutes.get('/stats/comments', StatsController.getTotalComments);
StatsRoutes.get('/stats/hotspots', StatsController.getTotalHotspots);
StatsRoutes.get('/stats/views', StatsController.getTotalViews);

StatsRoutes.get(
  '/stats/:userId/hotspots',
  StatsController.getUserTotalHotspots
);
StatsRoutes.get(
  '/stats/:userId/comments',
  StatsController.getUserTotalComments
);
StatsRoutes.get('/stats/:userId/ratio', StatsController.getGenderRatio);

export default StatsRoutes;
