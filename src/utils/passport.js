import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import { User } from '../models';
import config from '../config/config';

/**
 * JWT Strategy
 */

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        //find the user specified in token
        const foundUser = User.findById(payload.sub);
        //if user is found return the user
        if (foundUser) {
          return done(null, foundUser);
        }

        //otherwise, handle it
        return done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
