import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import {
  DefaultRoutes,
  HotspotRoutes,
  LocationRoutes,
  UserRoutes,
  CommentRoutes
} from './routes';
import path from 'path';

const app = express();

/**
 * Database configuration
 */
dbConfig();

/**
 * Middleware configuration
 */
middlewareConfig(app);

app.use('/api', [
  DefaultRoutes,
  HotspotRoutes,
  LocationRoutes,
  UserRoutes,
  CommentRoutes
]);

/**
 * Listening on PORT
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port: ${PORT}`);
    console.log(`Current enviroment is set to: ${process.env.NODE_ENV}`);
  }
});
