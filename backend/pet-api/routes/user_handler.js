const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
    passError: true
});

const ERROR = require('./route_errors');
const CONFIG = require('../common/config');

const express = require('express');
const router = express.Router();

const DataStoreManager = require('../datastore/datastoremanager');
const News = require('../models/user');
const User = require('../models/user');
const dsm = new DataStoreManager();


// ====== USER HANDLERS =======

// List all Users
router.get('/', async (req, res) => {

    console.log("=====Request Getting List of Users=====");

    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let resdata = await dsm.getUsers();

        // if there are no users, return error
        if (resdata.length == 0 || resdata == null || resdata =='undefined') {
            res.status(404).json(ERROR.nouserexistserror);
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


// Get User
router.get('/:user_id', async (req, res) => {
    
    console.log("=====Request Getting User by id=====");
    console.log("user_id: "+ req.params.user_id);

    try {

        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let data = await dsm.getUser(req.params.user_id);            
        
        // if doesn't exist, return error
        if (data[0] == 'undefined' || data[0] == null) {
            res.status(404).json(ERROR.nouserexistserror);
            return;
        }
        let usermodel = new User(req.params.user_id, data[0].owner_id, data[0].date_created, data[0].is_admin, data[0].email_notifications);
  
        resdata = {
            "id": usermodel.id,
            "owner_id": usermodel.owner_id,
            "date_created": usermodel.date_created,
            "is_admin": usermodel.is_admin,
            "email_notifications": usermodel.email_notifications,
            "self": usermodel.self
        }

        res.status(200).json(resdata);

        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


// Edit User's settings using PATCH
router.patch('/:user_id/settings', async (req, res) => {
    
    console.log("=====Request Updating a User using PATCH =====");
    
    console.log("id: "+ req.params.user_id);
    console.log("owner_id: "+ req.body.owner_id);
    console.log("user_alias: "+ req.body.user_alias);
    console.log("date_created:" + req.body.date_created);
    console.log("is_admin:" + req.body.is_admin);
    console.log("email_notifications:" + req.body.email_notifications);
    
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


        // if user doesn't exist, reject
        const test = await dsm.getUser(req.params.user_id);

        if (test[0] == 'undefined' || test[0] == null) {
            console.log("xxxx");
            res.status(404).json(ERROR.nonuserexistserror);
            return;
        }

        let id = req.params.user_id;
        let owner_id = test[0].owner_id;
        let date_created = test[0].date_created;
        let user_alias = test[0].user_alias;


        let is_admin = req.body.is_admin;

        if (is_admin == 'undefined' || is_admin == null) {
            is_admin = test[0].is_admin;
        }
        
        let email_notifications = req.body.email_notifications;

        if (email_notifications == 'undefined' || email_notifications == null) {
            email_notifications = test[0].email_notifications;
        }


        console.log("=====Values to be edited=====");

        console.log("user_id: "+ id);
        console.log("owner_id:" + owner_id);
        console.log("user_alias:" + user_alias);
        console.log("date_created:" + date_created);
        console.log("is_admin:" + is_admin);
        console.log("email_notifications:" + email_notifications);

        await dsm.updateUser(id, owner_id, user_alias, date_created, is_admin, email_notifications);
        let usermodel = new User(id, owner_id, user_alias, date_created, is_admin, email_notifications);
        let resdata = usermodel.jsonData();

        res.status(200).json(resdata);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


module.exports = router;