import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { addUser, getUserByPassport } from "../services/user.services.js";
import obj from "../config.js";
import { generateToken } from "../utils/utils.js";

//passport-github register
passport.use(
  "githubRegister",
  new GithubStrategy(
    {
      clientID: obj.github_register_client_id,
      clientSecret: obj.github_register_client_secret,
      callbackURL: "/user/github-register"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const newUser = {
          first_name: profile._json.name
            ? profile._json.name.split(" ")[0]
            : "-",
          last_name: profile._json.name
            ? profile._json.name.split(" ")[1] || "-"
            : "-",
          email: profile._json.email,
          password: obj.default_password,
        };
        const newData = await addUser(newUser);
        const data = generateToken(newData);
        done(null, data);
      } catch (err) {
        done();
      }
    }
  )
);

//passport-github login
passport.use(
  "githubLogin",
  new GithubStrategy(
    {
      clientID: obj.github_login_client_id,
      clientSecret: obj.github_login_client_secret,
      callbackURL: "/user/github-login",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await getUserByPassport(profile._json.email);
        if (user) {
          done(null, user);
        } else {
          done();
        }
      } catch (err) {
        done();
      }
    }
  )
);

//passport-google login
passport.use(
  "googleLogin",
  new GoogleStrategy(
    {
      clientID: obj.google_login_client_id,
      clientSecret: obj.google_login_client_secret,
      callbackURL: "/user/google-login",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = await getUserByPassport(profile._json.email);
        if (user) {
          done(null, user);
        } else {
          done();
        }
      } catch (error) {
        done();
      }
    }
  )
);

//passport-google register
passport.use(
  "googleRegister",
  new GoogleStrategy(
    {
      clientID: obj.google_register_client_id,
      clientSecret: obj.google_register_client_secret,
      callbackURL: "/user/google-register",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const newUser = {
          first_name: profile._json.name
            ? profile._json.name.split(" ")[0]
            : "-",
          last_name: profile._json.name
            ? profile._json.name.split(" ")[1] || "-"
            : "-",
          email: profile._json.email,
          password: obj.default_password,
        };
        const newData = await addUser(newUser);
        const data = generateToken(newData)
        done(null, data);
      } catch (err) {
        done();
      }
    }
  )
);

//method
const cookieExtractor = (req) => {
  const token = req.cookies?.tokenJwt;
  return token;
};

passport.use(
  "current",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: obj.secret_key_jwt,
    },
    async (jwtPayload, done) => {
      done(null, jwtPayload.user)
    }
  )
);

//default passport settings
//this only works when You're using express-passport like when you're using passport and {session: false}
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// })

// passport.deserializeUser(async(_id, done) => {
//   const user = await getUserByPassport(profile._json.email);
//   done(null, user);
// })
