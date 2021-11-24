const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
    passError: true
});

const ERROR = require('./route_errors');

const express = require('express');
const router = express.Router();

const DataStoreManager = require('../datastore/datastoremanager');
const Pet = require('../models/pet');

const dsm = new DataStoreManager();

const auth = require('../common/auth.js');


// Set / to only accept GET and POST
router.delete('/', (req, res) => {
    res.set('Accept', 'GET, POST');
    res.status(405).send(ERROR.methodnoallowederror);
});

// Set / to only accept GET and POST
router.put('/', (req, res) => {
    res.set('Accept', 'GET, POST');
    res.status(405).send(ERROR.methodnoallowederror);
});

// Set / to only accept GET and POST
router.patch('/', (req, res) => {
    res.set('Accept', 'GET, POST');
    res.status(405).send(ERROR.methodnoallowederror);
});


// List all pets
router.get('/', async (req, res) => {

    console.log("=====Request Getting List of Pets=====");

    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }
        let resdata = await dsm.getPets(); 
        console.log(resdata);

        // if there are no pets, return error
        if (resdata.length == 0 || resdata == null || resdata =='undefined') {
            res.status(404).json(ERROR.nopetexistserror);
            return;
        }

        res.status(200).json(resdata);

        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});

router.get('/filter', async (req, res) => {

    console.log("=====Request Getting List of Pets + Filter=====");

    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let type = req.query.type;
        let availability = req.query.availability;
        let breed = req.query.breed;
        let disposition = req.query.disposition;
        let adoptedby = req.query.adoptedby;
        let date_created = req.query.date_created;

        console.log("Search type: ", type);
        console.log("Search breed: ", breed);
        console.log("Search availability: ", availability);
        console.log("Search disposition: ", disposition);
        console.log("Search adoptedby: ", adoptedby);
        console.log("Search date_created: ", date_created);

        let resdata = await dsm.getPetsBySearch(type, availability, breed, disposition, adoptedby, date_created); 
        console.log(resdata);

        // if there are no pets, return empty array
        if (resdata.length == 0 || resdata == null || resdata =='undefined') {
            let resdata = [];
            res.status(200).json(resdata);
            return;
        }

        res.status(200).json(resdata);

        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});

// Get a pet
router.get('/:pet_id', async (req, res) => {
    
    console.log("=====Request Getting Pet by id=====");

    console.log("pet_id: "+ req.params.pet_id);

    try {

        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let data = await dsm.getPet(req.params.pet_id);            
        
        // if doesn't exist, return error
        if (data[0] == 'undefined' || data[0] == null) {
            res.status(404).json(ERROR.nopetexistserror);
            return;
        }

        let petmodel = new Pet(req.params.pet_id, data[0].availability, data[0].breed, data[0].date_created, data[0].description, data[0].disposition, data[0].name, data[0].picture_url, data[0].type, data[0].adoptedby);
  
        resdata = {
            "id": petmodel.id,
            "availability": petmodel.availability,
            "breed": petmodel.breed,
            "date_created": petmodel.date_created,
            "description": petmodel.description,
            "disposition": petmodel.disposition,
            "name": petmodel.name,
            "picture_url": petmodel.picture_url,
            "type": petmodel.type,
            "adoptedby": petmodel.adoptedby,
            "self": petmodel.self
        }

        res.status(200).json(resdata);

        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});

// Create a pet
router.post('/', async (req, res) => {

    console.log("=====Request Inserting a Pet=====");

    let test = auth.verifyToken(req);
    
    if (!test) {
        console.log("Unauthorized request.....Rejecting request!!!");
        return res.status(401).json(ERROR.unauthorizederror); 
    }

    //await processFile(req, res);

    console.log("availability:" + req.body.availability);
    console.log("breed:" + req.body.breed);
    console.log("description:" + req.body.description);
    console.log("disposition:" + req.body.disposition);
    console.log("name:" + req.body.name);
    console.log("type:" + req.body.type);
    console.log("picture_url:" + req.body.picture_url);
   
    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        // if content type is not json, reject, only needed if client is sending payload
        if (req.get('content-type') !== 'application/json'){
            res.status(415).end();
            return;
        }

        // insert if all conditions are met
        const date_created = new Date().toISOString().replace('T',' ').substr(0, 10);

        const key = await dsm.insertPet(req.body.availability, req.body.breed, date_created, req.body.description, req.body.disposition, req.body.name, req.body.picture_url, req.body.type);
        console.log("Inserted Pet, id: "+ key.id);
        console.log("Creation date: "+ date_created);

        let petmodel = new Pet(key.id, req.body.availability, req.body.breed, date_created, req.body.description, req.body.disposition, req.body.name, req.body.picture_url, req.body.type, null);
 
        resdata = {
            "id": petmodel.id,
            "availability": petmodel.availability,
            "breed": petmodel.breed,
            "date_created": petmodel.date_created,
            "description": petmodel.description,
            "disposition": petmodel.disposition,
            "name": petmodel.name,
            "picture_url": petmodel.picture_url,
            "type": petmodel.type,
            "adoptedby": petmodel.adoptedby,
            "self": petmodel.self
        }
        res.status(201).json(resdata);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});



// Edit a Pet using PATCH
router.patch('/:pet_id', async (req, res) => {
    
    console.log("=====Request Updating a Pet using PATCH =====");

    let test = auth.verifyToken(req);
    
    if (!test) {
        console.log("Unauthorized request.....Rejecting request!!!");
        return res.status(401).json(ERROR.unauthorizederror); 
    }

    console.log("pet_id: "+ req.params.pet_id);
    console.log("availability:" + req.body.availability);
    console.log("breed:" + req.body.breed);
    console.log("description:" + req.body.description);
    console.log("disposition:" + req.body.disposition);
    console.log("name:" + req.body.name);
    console.log("picture_url:" + req.body.picture_url);
    console.log("type:" + req.body.type);
    console.log("adoptedby:" + req.body.adoptedby);
     
    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        // if content type is not json, reject, only needed if client is sending payload
        if (req.get('content-type') !== 'application/json'){
            res.status(415).end();
            return;
        }


        // if pet doesn't exist, reject
        const test = await dsm.getPet(req.params.pet_id);

        if (test[0] == 'undefined' || test[0] == null) {
            res.status(404).send(ERROR.nopetexistserror);
            return;
        }

        let id = req.params.pet_id;

        let availability = req.body.availability;
        if (availability == 'undefined' || availability == null) {
            availability = test[0].availability;
        }

        let breed = req.body.breed;
        if (breed == 'undefined' || breed == null) {
            breed = test[0].breed;
        }

        let description = req.body.description;
        if (description == 'undefined' || description == null) {
            description = test[0].description;
        }

        let disposition = req.body.disposition;
        if (disposition == 'undefined' || disposition == null) {
            disposition = test[0].disposition;
        }

        let name = req.body.name;
        if (name == 'undefined' || name == null) {
            name = test[0].name;
        }

        let picture_url = req.body.picture_url;
        if (picture_url == 'undefined' || picture_url == null) {
            picture_url = test[0].picture_url;
        }

        let type = req.body.type;
        if (type == 'undefined' || type == null) {
            type = test[0].type;
        }

        let adoptedby = req.body.adoptedby;
        if (adoptedby == 'undefined' || adoptedby == null) {
            adoptedby = test[0].adoptedby;
        }

        let date_created = test[0].date_created;

        console.log("=====Values to be edited=====");

        console.log("pet_id: "+ id);
        console.log("availability:" + availability);
        console.log("breed:" + breed);
        console.log("description:" + description);
        console.log("disposition:" + disposition);
        console.log("name:" + name);
        console.log("picture_url:" + picture_url);
        console.log("type:" + type);
        console.log("adoptedby:" + adoptedby);
        console.log("date_created:" + date_created);

        await dsm.updatePet(id, availability, breed, date_created, description, disposition, name, picture_url, type, adoptedby)
        
        let petmodel = new Pet(id, availability, breed, date_created, description, disposition, name, picture_url, type, adoptedby);
  
        resdata = {
            "id": petmodel.id,
            "availability": petmodel.availability,
            "breed": petmodel.breed,
            "date_created": petmodel.date_created,
            "description": petmodel.description,
            "disposition": petmodel.disposition,
            "name": petmodel.name,
            "picture_url": petmodel.picture_url,
            "type": petmodel.type,
            "adoptedby": petmodel.adoptedby,
            "self": petmodel.self
        }
        

        res.status(200).json(resdata);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


// Delete a Pet
router.delete('/:pet_id', async (req, res) => {
    
    console.log("=====Request Deleteing a Pet=====");

    let test = auth.verifyToken(req);
    
    if (!test) {
        console.log("Unauthorized request.....Rejecting request!!!");
        return res.status(401).json(ERROR.unauthorizederror); 
    }

    console.log("pet_id: "+ req.params.pet_id);
    
    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        // test if pet exists, if no, return error
        const test = await dsm.getPet(req.params.pet_id);

        if (test[0] == 'undefined' || test[0] == null) {
            res.status(404).json(ERROR.nopetexistserror);
            return;
        }

        const data = await dsm.deletePet(req.params.pet_id);
        res.status(204).send();
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;