const ERROR = require('./route_errors');
const CONFIG = require('../common/config');

const { v4: uuidv4 } = require('uuid');

const express = require('express');
const router = express.Router();

const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = storage.bucket('pet-shelter-api-images');

// ====== FILE UPLOAD =======

router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));


// upload a file
router.post('/', async (req, res) => {
    console.log("=====Request Uploading an Image=====");

    try {
        await processFile(req, res);
        
        if (!req.file) {
          return res.status(400).send(ERROR.fileuploaderror);
        }

        let find = req.file.originalname.indexOf('.');
        let ext = req.file.originalname.substring(find);

        if (find == 0) {
            return res.status(400).send(ERROR.fileuploaderror);
        }

        let generated_file_name = uuidv4()+ext;
        console.log("original file name: " + req.file.originalname);
        console.log("uploading to bucket as filename: "+ generated_file_name);

        const blob = bucket.file(generated_file_name);

        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on("error", (err) => {
          res.status(500).send(ERROR.fileuploaderror);
        });
    
        blobStream.on("finish", async (data) => {
          const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          res.status(201).send({image_url: publicUrl});
          console.log("=====Response Sent=====");
        });
    
        blobStream.end(req.file.buffer);
      } 
      catch (err) {
        console.log(err);
        res.status(400).send(ERROR.unknownservererrror);
      }
});

module.exports = router;ß