import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { HotspotRoutes, LocationRoutes, UserRoutes } from './routes';

const app = express();

/**
 * Database configuration
 */
dbConfig();

/**
 * Middleware configuration
 */
middlewareConfig(app);

app.use('/api', [HotspotRoutes, LocationRoutes, UserRoutes]);

/**
 * Listening on PORT
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening to port: ${PORT}`);
  }
});
