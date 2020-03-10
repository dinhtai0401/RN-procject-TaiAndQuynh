const express = require("express");
const port = 4000;
const bodyParse = require("body-parser");
const passport = require("passport");
const app = express();
const BasicStrategy = require("passport-http").BasicStrategy
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('./jwt-key.json');
const users = require('./services/users');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./services/user-services');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./key');
const cookieParser = require("cookie-parser");
const postComponent = require('./components/post');

app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(bodyParse.json());
app.use(
    cookieSession({
      name: "session",
      keys: [keys.session.cookieKey ],
      maxAge: 24 * 60 * 60 * 100
}));

mongoose.connect(keys.mongodb.dbURL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb')
});

app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
}));
  


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postComponent);
//app.use('/auth', passportComponent);

// authenticate with BasicStrategy and Token and Google
// --------------------------------------------------------------------------------------
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

options.secretOrKey = jwtSecretKey.secret;

passport.use(new BasicStrategy(
    (username, password, done) => {
        const user = users.getUserByName(username);
        if ( user == undefined){
            console.log("HTTP Basic username not found");
            return done(null, false, { message: "HTTP Basic username not found" });
        }
       
            if( user.password != password ){
                console.log("HTTP Basic password not matching username");
                return done(null, false, { message: "HTTP Basic password not found" });
            }
            return done(null, user);
    }
));

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload);
    const date = Date.now() / 1000
    if(jwt_payload.exp > date){
        done(null, jwt_payload.user);
    }else{
        done(null, false);
    }
}));


app.get('/jwtProtectedResource', passport.authenticate('jwt', { session: false }), (req,res) =>{
    res.json(req.user);
  }
);

app.get('/loginForJWT', passport.authenticate('basic', { session: false}), (req,res) => {
    if(req.user.email !== undefined){
        const body = {
            id : req.user.id,
            email: req.user.email,
        };
        const payLoad = {
            user : body
        };
    
        const options = {
            expiresIn: '1d'
        };

        const token = jwt.sign(payLoad, jwtSecretKey.secret, options);
        return res.json({token});
       
    }else{
        res.sendStatus(400);
    }

});

/*passport.serializeUser((user, done) => {
    done(null, user.id);
});*/

/*passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id);
    })
});*/

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  },
   (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our db
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            // already have the user
            //console.log('user is:', currentUser);
            done(null, currentUser);
        }else{
            // if not have in mongodb
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                //console.log('new user created:' + newUser);
                done(null, newUser);
            });
        }
    })
}));

app.get("/auth/login/success",  (req, res) => {
    
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
      });
    }
});
  
app.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
}); 

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] 
}));

app.get('/auth/google/redirect', passport.authenticate('google') ,(req,res) =>{
    //res.redirect("http://localhost:3000");
    console.log(req.user)
    res.send(req.user)
});

app.get('/auth/logout', (req,res) => {
    req.logout();
    res.redirect("http://localhost:3000");
}); 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))