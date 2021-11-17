'use strict';
const axios = require('axios').default;
const crypto = require('crypto');
const CONFIG = require('./common/config');

const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true });

const publicip = require('public-ip');

const express = require('express');

const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const path = require('path');
const hbs = require('hbs');


const DataStoreManager = require('./datastore/datastoremanager');
const user = require('./models/user');
const dsm = new DataStoreManager();

const multer = require('multer');

const petsrouter = require('./routes/pets_handler');
const newsrouter = require('./routes/news_handler');
const viewsrouter = require('./routes/views_handler');
const uploadrouter = require('./routes/upload_handler');

let users_dict = {};
let retaccesstoken;


app.enable('trust proxy');
app.use(express.json());
app.use(session({secret: 'secret1234!!!',saveUninitialized: true,resave: true}));
    
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: CONFIG.oauth_client_id,
    clientSecret: CONFIG.oauth_client_secret,
    callbackURL: CONFIG.oauth_callback_url
  },
   async function(accessToken, refreshToken, profile, cb) {
    // called when successfully logged in
    console.log("successfully logged in");
    let owner_id = profile.id;
    let alias = profile.displayName;
    const date_created = new Date().toISOString().replace('T',' ').substr(0, 10);
    let is_admin = true;

    let user = {
        "owner_id": profile.id,
        "alias": profile.displayName,
        "accesstoken": accessToken,
        "is_admin": true 
    }

    users_dict[accessToken] = user;

    const test = await dsm.getUserByOwnerId(owner_id);

    // if user doesn't exist, insert
    if (test[0].length == 0) {
        console.log("====insert into DB====");
        console.log("ownerid: " + user.owner_id);
        console.log("alias: " + user.alias);
        console.log("accesstoken: ", user.accesstoken); 
        console.log("is_admin: ", user.is_admin); 
        await dsm.insertUser(owner_id, alias, date_created, is_admin);
    }
    retaccesstoken = accessToken;
    cb(null, user);
  }
));

passport.serializeUser((user, done) => {
    console.log("=====serialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("alias: " + user.alias);
    console.log("accesstoken: ", user.accesstoken); 
    console.log("is_admin: ", user.is_admin); 
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("=====deerialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("alias: " + user.alias);
    console.log("accesstoken: ", user.accesstoken);
    console.log("is_admin: ", user.is_admin); 
    return done(null, user);
})

app.get('/auth/google',
    passport.authenticate('google', {scope:['profile']}));

app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res) {
        // Need to change this to react client's entry url. TO-DO
        res.redirect(CONFIG.oauth_success_redirect_url+"?accesstoken="+retaccesstoken);
    }
);


app.get('/getProfile', (req, res) => {

    console.log("=====Request Getting User =====");
    let accesstoken = req.query.accesstoken
    console.log("accesstoken: "+ accesstoken);

    try {
        let retuser = users_dict[accesstoken]
        console.log(retuser);

        //res.user = retuser;
        res.send(retuser);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


app.get('/logout', (req, res) => {

    console.log("=====Request Loging out User=====");

    try {
        let accesstoken = req.query.accesstoken;
        console.log("accesstoken:" + accesstoken);

        let retuser = users_dict[accesstoken]
        console.log("retuser:" + retuser);

        if (retuser) {
            console.log("found accesstoken: " + accesstoken)
            console.log("removing from dictionary")
            delete users_dict[accesstoken];
        }
        console.log(req.user);
        if (req.user) {
            req.logout();     
        }
        res.send("done");
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});



// View handler
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');
app.use('/', viewsrouter);

// Pets handler
app.use('/pets', petsrouter);

// News handler
app.use('/news', newsrouter);

// Upload handler
app.use('/upload', uploadrouter);


// Listen to the App Engine-specified port, or 8000 otherwise
const port = process.env.PORT || 3000;
app.listen(port, async () => {

    (
        async function () {
            let ip = await publicip.v4();
            process.env.IP = ip;
      }()
    );

  console.log(`Server listening on port ${port}...`);
});