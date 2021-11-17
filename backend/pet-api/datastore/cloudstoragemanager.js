const util = require('util');
const Multer = require('multer');
const maxSize = 2 * 1024 * 1024;
const {Storage} = require('@google-cloud/storage');
const CONFIG = require('../common/config');

class CloudStorageManager {

    constructor() {
        this.storage = new Storage();
        this.bucket = storage.bucket('pet-shelter-api-images');
    }

    async uploadFile() {
  
        try {
            console.log("====Storage object====");
            console.log(this.storage);
            console.log("====Bucket object====");
            console.log(this.bucket);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
}

module.exports = CloudStorageManager;
