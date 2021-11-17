const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
    passError: true
});

const ERROR = require('./route_errors');
const CONFIG = require('../common/config');

const express = require('express');
const router = express.Router();

const DataStoreManager = require('../datastore/datastoremanager');
const News = require('../models/news');
const dsm = new DataStoreManager();


// ====== NEWS HANDLERS =======

// List all News
router.get('/', async (req, res) => {

    console.log("=====Request Getting List of News=====");

    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let resdata = await dsm.getNewsList();

        // if there are no news, return error
        if (resdata.length == 0 || resdata == null || resdata =='undefined') {
            res.status(404).json(ERROR.emptypetlisterror);
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


// Get News item
router.get('/:news_id', async (req, res) => {
    
    console.log("=====Request Getting News by id=====");
    console.log("news_id: "+ req.params.news_id);

    try {

        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        let data = await dsm.getNews(req.params.news_id);            
        
        // if doesn't exist, return error
        if (data[0] == 'undefined' || data[0] == null) {
            res.status(404).json(ERROR.nonewsexistserror);
            return;
        }
        let newsmodel = new News(req.params.news_id, data[0].title, data[0].content, data[0].date_created, data[0].news_url)
  
        resdata = {
            "id": newsmodel.id,
            "title": newsmodel.title,
            "content": newsmodel.content,
            "date_created": newsmodel.date_created,
            "news_url": newsmodel.news_url,
            "self": newsmodel.self
        }

        res.status(200).json(resdata);

        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});

// Create a News item
router.post('/', async (req, res) => {

    console.log("=====Request Inserting a News=====");

    console.log("title:" + req.body.title);
    console.log("content:" + req.body.content);
    console.log("news_url:" + req.body.news_url);
   
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
        //let news_url = "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dog_coat_variation.png";
        
        const date_created = new Date().toISOString().replace('T',' ').substr(0, 10);

        const key = await dsm.insertNews(req.body.title, req.body.content, date_created, req.body.news_url)

        console.log("Inserted News, id: "+ key.id);
        console.log("Creation date: "+ date_created);
        
        let newsmodel = new News(key.id, req.body.title, req.body.content, date_created, req.body.news_url);

        resdata = {
            "id": newsmodel.id,
            "title": newsmodel.title,
            "content": newsmodel.content,
            "date_created": newsmodel.date_created,
            "news_url": newsmodel.news_url,
            "self": newsmodel.self
        }

        res.status(201).json(resdata);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


// Edit News using PATCH
router.patch('/:news_id', async (req, res) => {
    
    console.log("=====Request Updating a News Item using PATCH =====");
    
    console.log("news_id: "+ req.params.news_id);
    console.log("title:" + req.body.title);
    console.log("content:" + req.body.content);
    console.log("news_url:" + req.body.news_url);
    
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


        // if news item doesn't exist, reject
        const test = await dsm.getNews(req.params.news_id);

        if (test[0] == 'undefined' || test[0] == null) {
            res.status(404).json(ERROR.nonewsexistserror);
            return;
        }

        let id = req.params.news_id;

        let title = req.body.title;
        if (title == 'undefined' || title == null) {
            title = test[0].title;
        }

        let content = req.body.content;
        if (content == 'undefined' || content == null) {
            content = test[0].content;
        }

        let news_url = req.body.news_url;
        if (news_url == 'undefined' || news_url == null) {
            news_url = test[0].news_url;
        }

        let date_created = test[0].date_created;

        console.log("=====Values to be edited=====");

        console.log("news_id: "+ id);
        console.log("title:" + title);
        console.log("content:" + content);
        console.log("news_url:" + news_url);
        console.log("date_created:" + date_created);

        await dsm.updateNews(id, title, content, date_created, news_url);
        let newsmodel = new News(id, title, content, date_created, news_url);
  
        resdata = {
            "id": newsmodel.id,
            "title": newsmodel.title,
            "content": newsmodel.content,
            "date_created": newsmodel.date_created,
            "news_url": newsmodel.news_url,
            "self": newsmodel.self
        }
        

        res.status(200).json(resdata);
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(ERROR.unknownservererrror);
    }
});


// Delete a News item
router.delete('/:news_id', async (req, res) => {
    
    console.log("=====Request Deleteing a News Item=====");
    console.log("news_id: "+ req.params.news_id);
    
    try {
        // if accept is not json, reject, server cannot respond non-json results
        if (!req.accepts(['application/json'])){
            res.status(406).end();
            return;
        }

        // test if news item exists, if no, return error
        const test = await dsm.getNews(req.params.news_id);

        if (test[0] == 'undefined' || test[0] == null) {
            res.status(404).json(ERROR.nonewsexistserror);
            return;
        }

        const data = await dsm.deleteNews(req.params.news_id);
        res.status(204).send();
        console.log("=====Response Sent=====");
    }
    catch (error) {
        console.log(error);
    }
});



module.exports = router;