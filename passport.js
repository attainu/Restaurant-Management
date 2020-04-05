const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const { Strategy: FacebookStrategy } = require("passport-facebook");
const User = require("./models/User");
const Admin = require("./models/Admin");

// JWT Strategy authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    req => req.cookies.accessToken
  ]),
  secretOrKey: process.env.JWT_SECRET_KEY
};

passport.use(
  new JWTStrategy(jwtOptions, async ({ Id }, done) => {
    try {
      const user = await User.findById(Id);
      const admin = await Admin.findById(Id);
      if (!admin && user ) return done(null, false, { message: "Incorrect Credentials" });
      done(null, admin || user);
    } catch (err) {
      if (err === "Error") {
        done(err);
      }
    }
  })
);

// Local Strategy login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      adminnameField: "email",
      passwordFieldForuser: "password",
      passwordFieldForadmin: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findByEmailAndPassword(email, password);
        const admin = await Admin.findByEmailAndPassword(email, password);
        if (user) return done(null, user);
        if (admin) return done(null, admin);
      } catch (err) {
        if (err.name === "AuthError")
          done(null, false, { message: err.message });
        done(err);
      }
    }
  )
)



// Local Strategy login
// passport.use(
//   new LocalStrategy(
//     {
//       adminnameField: "email",
//       passwordField1: "password"
//     },
//     async (email, password, done) => {
//       try {
//         const admin = await Admin.findByEmailAndPassword(email, password);
//         return done(null, admin);
//       } catch (err) {
//         if (err.name === "AuthError")
//           done(null, false, { message: err.message });
//         done(err);
//       }
//     }
//   )
// );

// passport.use(
//   new JWTStrategy(jwtOptions, async ({ id }, done) => {
//     try {
//       const admin = await Admin.findById(id);
//       if (!admin) return done(null, false, { message: "Incorrect Credentials" });
//       done(null, admin);
//     } catch (err) {
//       if (err.name === "Error") {
//         done(err);
//       }
//     }
//   })
// );
