import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { HotspotRoutes, LocationRoutes } from './routes';

const app = express();

/**
 * Database configuration
 */
dbConfig();

/**
 * Middleware configuration
 */
middlewareConfig(app);

app.use('/api', [HotspotRoutes, LocationRoutes]);

/**
 * Listening on PORT
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening to port: ${PORT}`);
  }
});
