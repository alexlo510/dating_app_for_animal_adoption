'use strict';
const axios = require('axios').default;
const crypto = require('crypto');
const CONFIG = require('./common/config');
const ERROR = require('./routes/route_errors');

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
const dsm = new DataStoreManager();

const petsrouter = require('./routes/pets_handler');
const newsrouter = require('./routes/news_handler');
const viewsrouter = require('./routes/views_handler');
const uploadrouter = require('./routes/upload_handler');
const usersrouter = require('./routes/user_handler');

let users_dict = {};
let retaccesstoken;
let auth_check = {};
auth_check['auth_config'] = true;

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
    console.log("===successfully logged in===");
    console.log("profile: ", profile);

    let owner_id = profile.id;
    let user_alias = profile.displayName;
    const date_created = new Date().toISOString().replace('T',' ').substr(0, 10);
    let is_admin = false;
    let email_notifications = true;

    let user = {
        "owner_id": profile.id,
        "user_alias": profile.displayName,
        "accesstoken": accessToken,
        "is_admin": is_admin,
        "email_notifications": email_notifications
    }

    users_dict[accessToken] = user;

    const test = await dsm.getUserByOwnerId(owner_id);
    console.log("test: ", test)
    // if user doesn't exist, insert, by default is_admin is false, email_notifications is true 
    if (test == undefined || test.length == 0) {
        console.log("====insert into DB====");
        console.log("ownerid: " + user.owner_id);
        console.log("user_alias: " + user.user_alias);
        console.log("accesstoken: ", user.accesstoken); 
        console.log("is_admin: ", user.is_admin); 
        console.log("email_notifications: ", user.email_notifications); 
        await dsm.insertUser(owner_id, user_alias, date_created, is_admin, email_notifications);
    }
    retaccesstoken = accessToken;
    console.log("Total users in Dict: ", Object.keys(users_dict).length);
    cb(null, user);
  }
));

passport.serializeUser((user, done) => {
    console.log("=====serialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("user_alias: " + user.user_alias);
    console.log("accesstoken: ", user.accesstoken); 
    console.log("is_admin: ", user.is_admin); 
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("=====deerialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("user_alias: " + user.user_alias);
    console.log("accesstoken: ", user.accesstoken);
    console.log("is_admin: ", user.is_admin); 
    return done(null, user);
})

app.get('/auth/google',
    passport.authenticate('google', {scope:['profile']})
);

app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res) {
        // Need to change this to react client's entry url. TO-DO
        res.redirect(CONFIG.oauth_success_redirect_url+"?accesstoken="+retaccesstoken);
    }
);

app.get('/getProfile', async (req, res) => {

    console.log("=====Request Getting User =====");

    try {
        let accesstoken = req.query.accesstoken
        console.log("accesstoken: "+ accesstoken);

        if (accesstoken == 'undefined' || accesstoken == null) {
            return res.status(400).send(ERROR.invalidtokenerror);
        }

        let dict_user = users_dict[accesstoken]
        console.log("user in dictionary: " , dict_user);
        
        if (dict_user == 'undefined' || dict_user == null) {
            return res.status(400).send(ERROR.invalidtokenerror);
        }

        let owner_id = dict_user.owner_id;
        console.log("user owner_id: " , owner_id);

        let retuser = await dsm.getUserByOwnerId(owner_id);
        
        if (retuser.length == 0 || retuser == 'undefined' || retuser == null) {
            return res.status(404).send(ERROR.nonuserexistserror);
        }

        retuser[0].accesstoken = accesstoken;

        console.log(retuser[0]);

        res.send(retuser[0]);
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

        if (accesstoken == 'undefined' || accesstoken == null) {
            return res.status(400).send(ERROR.noaccesstokenerror);
        }

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


app.get('/setAuthCheck', (req, res) => {

    console.log("=====Request setting authcheck=====");

    try {
        let authcheck = req.query.authcheck;
        
        if (authcheck == 'undefined' || authcheck == null) {
            return res.status(400).send(ERROR.unknownservererrror);
        }

        if (authcheck == false) {
            auth_check['auth_config'] = false;
            console.log("authcheck is set to: " + authcheck);
            console.log(auth_check);
        }
        else {
            auth_check['auth_config'] = true;
            console.log("authcheck is set to: " + authcheck);
            console.log(auth_check);
        }
        let msg = "Authcheck set to: " + authcheck;
        res.status(200).send(msg);
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

// Users handler
app.use('/users', usersrouter);

// Pass user_dictionary
app.set('user_dict', users_dict);
app.set('auth_check', auth_check);


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