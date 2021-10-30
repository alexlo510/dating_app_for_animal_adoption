'use strict';
const axios = require('axios').default;
const crypto = require('crypto');
const CONFIG = require('./common/config');

const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
    passError: true
});

const publicip = require('public-ip');

const express = require('express');

const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const path = require('path');
const hbs = require('hbs');

const petsrouter = require('./routes/pets_handler');
const newsrouter = require('./routes/news_handler');
const viewsrouter = require('./routes/views_handler');

app.enable('trust proxy');
app.use(express.json());
app.use(session({secret: 'secret1234!!!',saveUninitialized: true,resave: true}));

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

let accesstoken =null;
passport.use(new GoogleStrategy({
    clientID: CONFIG.oauth_client_id,
    clientSecret: CONFIG.oauth_client_secret,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // called when successfully logged in   
    accesstoken = accessToken;
    cb(null, profile, accessToken);
    console.log(profile);
    console.log(accessToken);
    
  }
));

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    return done(null, user);
})

app.get('/auth/google',
    passport.authenticate('google', {scope:['profile']}));

app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res) {
        res.redirect('/profile/'+accesstoken);
    }
);


// View handler
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');
app.use('/', viewsrouter);

// Pets handler
app.use('/pets', petsrouter);

// News handler
app.use('/news', newsrouter);



// Listen to the App Engine-specified port, or 8000 otherwise
const port = process.env.PORT || 8000;
app.listen(port, async () => {

    (
        async function () {
            let ip = await publicip.v4();
            process.env.IP = ip;
      }()
    );

  console.log(`Server listening on port ${port}...`);
});