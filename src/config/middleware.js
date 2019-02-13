import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
<<<<<<< HEAD

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  app.use(passport.initialize());
=======
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import monk from 'monk';

const db = monk('localhost:27017/hotspot');

export default app => {
  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(bodyParser.urlencoded({ limit: '4mb', extended: false }));
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use(express.static(path.join(__dirname, '../public')));
  //we're adding db object to every HTTP request our app makes
  app.use(function(req, res, next) {
    req.db = db;
    next();
  });
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../views'));
  //cors configurations
  app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin-X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.use(cookieParser());
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
>>>>>>> exp
};
