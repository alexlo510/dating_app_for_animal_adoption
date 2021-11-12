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
        // Instantiate a storage client
        const storage = new Storage();
        console.log("====storage====");
        console.log(storage);
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}

//testClientCall();
//testDBConnection();
testUploadImage();
