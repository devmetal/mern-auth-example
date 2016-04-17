import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from './models/user';

const localOptions = {
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
};

const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeader(),
   secretOrKey: 'secret'
};

const localCallback = (req, email, pass, done) => {
   User.findOne({email})
      .then((user) => {
         if (!user) {
            done(null, false);
         } else if (!user.validatePassword(pass)) {
            done(null, false);
         } else {
            done(null, user);
         }
      })
      .catch((err) => {
         done(err, false);
      }); 
};

const jwtCallback = (payload, done) => {
   const cuid = payload.sub;
   User.findOne({cuid})
      .then((user) => {
         if (!user) {
            done(null, false);
         } else {
            done(null, user);
         }
      })
      .catch((err) => {
         done(err, false);
      });
};

const localStrategy = new LocalStrategy(
   localOptions, localCallback
);

const jwtStrategy = new JwtStrategy(
   jwtOptions, jwtCallback
);

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

export default passport;