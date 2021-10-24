const ERROR = require('./route_errors');
const CONFIG = require('../common/config');

const express = require('express');
const router = express.Router();
const session = require('express-session');
const crypto = require('crypto');
const axios = require('axios').default;

const DataStoreManager = require('../datastore/datastoremanager');
const dsm = new DataStoreManager();

let sess;

async function exchangeToken(code)
{
    let url = "https://oauth2.googleapis.com/token?"+
    "client_id="+CONFIG.oauth_client_id+"&"+
    "client_secret="+CONFIG.oauth_client_secret+"&"+
    "code="+code+"&"+
    "grant_type=authorization_code"+"&"+
    "redirect_uri="+CONFIG.oauth_redirect;

    console.log(url);

    try {
        let res = await axios.post(url);
        console.log("======= response data =======");
        console.log(res.data);
        console.log("======= access_token  =======");
        console.log("access_token: "+res.data.access_token);
        console.log("======= id_token data =======");
        console.log("id_token: "+res.data.id_token);

        return {
            "access_token": res.data.access_token,
            "id_token": res.data.id_token
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function getProfile(accesstoken)
{
    let url = "https://people.googleapis.com/v1/people/me?personFields=names&"+
    "access_token="+accesstoken;

    console.log(url);

    try {
        let res = await axios.get(url);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};

router.get('/', async (req, res) => {

    try {
        sess = req.session;
        let state = crypto.randomBytes(64).toString('hex');
        console.log("generated state: "+ state);
        console.log("generated sessionid: "+ req.sessionID);

        sess.state = state;

        let oauth_url = "https://accounts.google.com/o/oauth2/v2/auth?"+
        "scope="+CONFIG.oauth_scope+"&"+
        "access_type=offline&"+
        "response_type=code&"+
        "state="+state+"&"+
        "redirect_uri="+CONFIG.oauth_redirect+"&"+
        "client_id="+CONFIG.oauth_client_id;

        res.render('./views/Home', {
            url: oauth_url
        })
    }
    catch (error) {
        console.log(error);
    }
})

router.get('/oauth', async (req, res) => {
 
    if (sess == 'undefined' || sess == null) {
        console.log("Session error entered");
        res.render('./views/Error', {
            render_home_url: CONFIG.view_home_url
        })
        return;
    }
    
    let error = req.query.error;
    let code = req.query.code;
    let session_state = sess.state;
    let request_state = req.query.state;

    console.log("current state in request param: "+ request_state);
    console.log("current state in session: "+ session_state);

    // If not authorized, render error page. 
    //This happens when there is an error message on redirect 
    //OR the state value returned is different from the original state (stored in session)
    if (error != null || session_state !== request_state) {
        console.log("error entered");
        res.render('./views/Error', {
            render_home_url: CONFIG.view_home_url
        })
        return;
    }

    if (code != null) {

        try {
            let tokendata = await exchangeToken(code);
            console.log("=========TOKEN DATA=========");
            console.log(tokendata);

            let access_token = tokendata.access_token;

            console.log("access_token: " + tokendata.access_token);
            console.log("==================");
            console.log("id_token: "+ tokendata.id_token);
            let data = await getProfile(access_token);
            console.log("==================");
            console.log("error:" + error);
            console.log("==================");
            console.log("code:" + code);
            //console.log("==================");
            //console.log(data.data.names[0]);
            console.log("==================");
            console.log("userid: " + data.data.names[0].metadata.source.id);

            let displayname = data.data.names[0].displayName;
            let firstname= data.data.names[0].givenName;
            let lastname = data.data.names[0].familyName;
            let owner_id = data.data.names[0].metadata.source.id;
            
            let test = await dsm.getUserByOwnerId(owner_id);

            if (test.length == 0) {
                console.log("New User logged in");
                const creation_date = new Date().toISOString().replace('T',' ').substr(0, 10);
                let key = await dsm.insertUser(owner_id, creation_date);         
                console.log("Inserted User, id: "+ key.id);
            }
            
            res.render('./views/Profile', {
                render_firstname: firstname,
                render_lastname: lastname,
                render_displayname: displayname,
                render_state: session_state,
                render_id_token: tokendata.id_token,
                render_user_id: owner_id,
                render_home_url: CONFIG.view_home_url
            })
        }
        catch (error) {
            console.log(error);
            res.render('./views/Error', {
                render_home_url: CONFIG.view_home_url
            })
        }
    }
})

module.exports = router;