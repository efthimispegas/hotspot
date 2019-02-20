import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import {
  DefaultRoutes,
  HotspotRoutes,
  UserRoutes,
  CommentRoutes,
  FileRoutes
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
  UserRoutes,
  CommentRoutes,
  FileRoutes
]);

/**
 * Catch any errors and pass them to
 * the error handler
 */
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //respond to the client
  res.status(status).json({
    message: 'There has been a connection error',
    details: err //-> change it to "error" in prod
  });

  //respond to ourselves
  console.log(err);
});

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
