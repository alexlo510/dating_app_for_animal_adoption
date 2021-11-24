const baseurl ="https://pet-shelter-api.uw.r.appspot.com";
//const baseurl ="http://localhost:3000";
//const port = 8000;
//const ip = 'localhost';

// TO-DO: Harded coded secret. Should set these in environment variables instead of code. 
// Pet-API
const oauth_client_id ='570264399882-v8tm7os3eb1hnn6lbfbla5nl03d486u4.apps.googleusercontent.com';
const oauth_client_secret ='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';
const oauth_callback_url = baseurl+"/auth/google/callback";
//const oauth_success_redirect_url = baseurl+"/profile";
const oauth_success_redirect_url = "http://localhost:3000";


let view_home_url =baseurl+'/home';
let google_oauth_url = baseurl+"/auth/google";

const petbaseurl = baseurl+"/pets";
const newsbaseurl = baseurl+"/news";
const userbaseurl = baseurl+"/users"

module.exports = {
    petbaseurl,
    newsbaseurl,
    userbaseurl,
    oauth_client_id,
    oauth_client_secret,
    view_home_url,
    google_oauth_url,
    oauth_callback_url,
    oauth_success_redirect_url
};