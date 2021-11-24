const CONFIG = require('./config');

function verifyToken(req) {
    
    // Check for token + authorization
    let headertest = req.headers.authorization;
    let user_dict = req.app.get('user_dict');
    let auth_check = req.app.get('auth_check');
    
    console.log("auth_check:", auth_check);

    // if (auth_check['auth_config'] == false) {
    //     console.log("Bypassing Authcheck........");
    //     return true;
    // }

    // No token in header
    if (headertest == 'undefined' || headertest == null) {
        return false;
    }
    // try to get the id_token
    let accesstoken = headertest.split(" ")[1];
    console.log("accesstoken: " + accesstoken);

    // No token in dictionary, user was never authorized
    let tokentest = user_dict[accesstoken];

    if (tokentest == 'undefined' || tokentest == null) {
        return false;
    }
    console.log("Found authorized accesstoken.....Accepting Request!!!")
    return true;

}

module.exports = {
    verifyToken
};