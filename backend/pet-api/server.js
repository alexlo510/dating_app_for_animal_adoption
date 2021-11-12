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


const DataStoreManager = require('./datastore/datastoremanager');
const user = require('./models/user');
const dsm = new DataStoreManager();

const multer = require('multer');

const petsrouter = require('./routes/pets_handler');
const newsrouter = require('./routes/news_handler');
const viewsrouter = require('./routes/views_handler');



app.enable('trust proxy');
app.use(express.json());
app.use(session({secret: 'secret1234!!!',saveUninitialized: true,resave: true}));

//app.use(cors({
//    origin: ["http://localhost:3000","https://pet-shelter-fe.wl.r.appspot.com"],
//    credentials: true
//}));
//var cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(passport.initialize());
app.use(passport.session());

let accesstoken =null;
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

    let retuser = {
        "owner_id": profile.id,
        "alias": profile.displayName,
        "accesstoken": accessToken 
    }

    const test = await dsm.getUserByOwnerId(owner_id);

    // if user doesn't exist, insert
    if (test[0].length == 0) {
        console.log("====insert into DB====");
        console.log("ownerid: " + retuser.owner_id);
        console.log("alias: " + retuser.alias);
        console.log("accesstoken: ", retuser.accesstoken); 
        await dsm.insertUser(owner_id, alias, date_created);
    }
    cb(null, retuser);
  }
));

passport.serializeUser((user, done) => {
    console.log("=====serialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("alias: " + user.alias);
    console.log("accesstoken: ", user.accesstoken); 
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("=====deerialize======");
    console.log("owner_id: " + user.owner_id);
    console.log("alias: " + user.alias);
    console.log("accesstoken: ", user.accesstoken); 
    return done(null, user);
})

app.get('/auth/google',
    passport.authenticate('google', {scope:['profile']}));

app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/error'}),
    function(req, res) {
        // Need to change this to react client's entry url. TO-DO
        res.redirect(CONFIG.oauth_success_redirect_url);
    }
);

app.get('/getProfile', async (req, res) => {

    console.log("=====Request Getting User=====");
    console.log(req.user);
    try {
        res.send(req.user);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


app.get('/logout', async (req, res) => {

    console.log("=====Request Loging out User=====");

    try {
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



// GCS
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/uploads', (req, res, next) => {

})



// View handler
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');
app.use('/', viewsrouter);

// Pets handler
app.use('/pets', petsrouter);

// News handler
app.use('/news', newsrouter);



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