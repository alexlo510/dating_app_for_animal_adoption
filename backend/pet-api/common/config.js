const baseurl ="https://pet-shelter-api.uw.r.appspot.com";
//const baseurl ="http://localhost:8000";
const port = 8000;
const ip = 'localhost';

// TO-DO: Harded coded secret. Should set these in environment variables instead of code. 
// Pet-API
const oauth_client_id ='570264399882-v8tm7os3eb1hnn6lbfbla5nl03d486u4.apps.googleusercontent.com';
const oauth_client_secret ='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';

//const oauth_redirect ='https://osu-cs493-project-b.et.r.appspot.com/oauth';
const oauth_redirect ='http://localhost:8000/oauth';
const oauth_scope ='https://www.googleapis.com/auth/userinfo.profile';

//let view_home_url = "https://osu-cs493-project-b.et.r.appspot.com";
let view_home_url ='http://localhost:8000';


const petbaseurl = baseurl+"/pets"
const newsbaseurl = baseurl+"/news"

module.exports = {
    petbaseurl,
    newsbaseurl,
    oauth_client_id,
    oauth_client_secret,
    oauth_redirect,
    oauth_scope,
    view_home_url
};