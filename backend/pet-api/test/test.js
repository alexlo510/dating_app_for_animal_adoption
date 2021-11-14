'use strict';
const axios = require('axios').default;
const { Datastore } = require('@google-cloud/datastore');
const { entity } = require('@google-cloud/datastore/build/src/entity');
const {Storage} = require('@google-cloud/storage');


async function testClientCall()
{

    let url = "https://pet-shelter-api.uw.r.appspot.com/pets";

    console.log(url);

    try {
        let res = await axios.get(url);
        console.log("======= response data =======");
        console.log(res)
    }
    catch (error) {
        console.log(error);
    }
}

async function testClientCall2()
{
    try {
        let ownerid = "118068863155110619242";
        const res = await axios.get("http://localhost:3000/getProfile", { withCredentials: true , owner_id: ownerid}, )
        //let res = await axios.get(url);
        console.log("======= response data =======");
        console.log(res)
    }
    catch (error) {
        console.log(error);
    }
}

async function testClientGetProfile()
{
    try {
        let accesstoken = "ya29.a0ARrdaM9KQYpvWaySIGCdRQg3GO3Vf_8-I1iTiyHjMTBihNG6fwyuo0JMQDul7VqWv2hRCWYSdtUhK-DhJzIf4GBL7oIxZh_vQKoARoM9mLtcIsinAkPBPz6Ctu-Z34pkgC0cTiAJ8XJ_89V-2u2fTVQHfU6bDg";
        let url = "http://localhost:3000/getProfile?accesstoken="+accesstoken;
        const res = await axios.get(url, { withCredentials: true}, )
        //let res = await axios.get(url);
        console.log("======= response data =======");
        console.log(res)
    }
    catch (error) {
        console.log(error);
    }
}

async function testClientLogout()
{
    try {
        let accesstoken = "ya29.a0ARrdaM9KQYpvWaySIGCdRQg3GO3Vf_8-I1iTiyHjMTBihNG6fwyuo0JMQDul7VqWv2hRCWYSdtUhK-DhJzIf4GBL7oIxZh_vQKoARoM9mLtcIsinAkPBPz6Ctu-Z34pkgC0cTiAJ8XJ_89V-2u2fTVQHfU6bDg";
        let url = "http://localhost:3000/logout?accesstoken="+accesstoken;
        const res = await axios.get(url, { withCredentials: true}, )
        //let res = await axios.get(url);
        console.log("======= response data =======");
        console.log(res)
    }
    catch (error) {
        console.log(error);
    }
}

async function testDBConnection() {
    try {
        let datastore = new Datastore();
        console.log("1");
        const query = datastore.createQuery('pet');
        console.log("2");
        const data = await datastore.runQuery(query);
        console.log("3");
        console.log(data);
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}


async function testUploadImage() {
    try {
        let user = {
            "owner_id": 1234, 
            "alias": "Chris", 
            "accesstoken": 555555
        }

        let users_dict = {};
        users_dict[1234] = user;


        // Instantiate a storage client
        const storage = new Storage();
        console.log("====storage====");
        console.log(storage);
        console.log(users_dict[1234].accesstoken);
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function test() {
    await testClientGetProfile();
    await sleep(1000);
    await testClientLogout();
}

test();
