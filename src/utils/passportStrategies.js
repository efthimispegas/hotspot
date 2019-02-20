import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-plus-token';
import FacebookStrategy from 'passport-facebook-token';

import { User } from '../models';
import config from '../config/config';

/**
 * JWT Strategy
 */

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        //find the user specified in token
        const foundUser = User.findById(payload.sub);
        //if user is not found, handle it
        if (!foundUser) {
          return done(null, false);
        }
        //otherwise, return user
        done(null, foundUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/**
 * Local Strategy
 */

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        //find the user using the email
        const foundUser = await User.findOne({ email });
        //if the user is not found, handle it
        if (!foundUser) {
          return done(null, false);
        }
        //check if the given password is correct
        const isMatch = await foundUser.isMatch(password);
        if (!isMatch) {
          return done(null, false);
        }
        done(null, foundUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/**
 * Google Strategy
 */

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.google.CLIENT_ID,
      clientSecret: config.google.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const foundUser = User.findOne({ 'providerData.uid': profile.id });
        if (foundUser) {
          return done(null, foundUser);
        }
        //new account
        const newUser = new User({
          provider: 'google',
          providerData: {
            uid: profile.id,
            username: profile.displayName,
            avatar: profile.photos[0].value,
            fullname: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value
          }
        });
        console.log('===============');
        console.log('[Passport] newUser:', newUser);
        console.log('===============');
        await newUser.save(function(error) {
          if (error) {
            throw error;
          }
        });
        done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/**
 * Facebook Strategy
 */

passport.use(
  'facebook',
  new FacebookStrategy(
    {
      clientID: config.facebook.CLIENT_ID,
      clientSecret: config.facebook.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('===============');
      console.log('profile:', profile);
      console.log('===============');
      try {
        //if the user has previously logged in, don't create him
        const foundUser = User.findOne({ 'prodiverData.uid': profile.id });
        if (foundUser) {
          return done(null, foundUser);
        }
        //otherwise create a new user, then login
        const newUser = new User({
          provider: 'facebook',
          providerData: {
            uid: profile.id,
            username: profile.displayName,
            avatar: profile.photos[0].value,
            fullname: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value
          }
        });

        newUser.save(function(error) {
          if (error) {
            throw error;
          }
        });
        done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
