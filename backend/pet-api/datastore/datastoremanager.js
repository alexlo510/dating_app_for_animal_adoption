const { Datastore } = require('@google-cloud/datastore');
const { entity } = require('@google-cloud/datastore/build/src/entity');

const Pet = require('../models/pet');
const News = require('../models/news');
const CONFIG = require('../common/config');

class DataStoreManager {

    constructor() {
        this.datastore = new Datastore();
    }

    async getPets() {
  
        try {
            const query = this.datastore.createQuery('pet');
            const data = await this.datastore.runQuery(query);
            const petmodel = new Pet();
            let ret = petmodel.map(data[0], this.datastore);

            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };

    async getPet(id) {
        try {
            const key = this.datastore.key(['pet', Number(id)]);
            const data = await this.datastore.get(key);
            return data;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async insertPet(availability, breed, date_created, description, disposition, name, picture_url, type) {
        try {
            const key = this.datastore.key('pet');
            const data = {
                "availability": availability,
                "breed": breed, 
                "date_created": date_created,
                "description": description,
                "disposition": disposition,
                "name": name,
                "picture_url": picture_url,
                "type": type,
                "adoptedby": null
            };
            await this.datastore.save({"key":key, "data":data})
            return key;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }

    async updatePet(id, availability, breed, date_created, description, disposition, name, picture_url, type, adoptedby) {
        try {
            const key = this.datastore.key(['pet', Number(id)]);
            const data = {
                "availability": availability,
                "breed": breed, 
                "date_created": date_created,
                "description": description,
                "disposition": disposition,
                "name": name,
                "picture_url": picture_url,
                "type": type,
                "adoptedby": adoptedby
            };
            const ret = await this.datastore.save({"key":key, "data":data});
            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async deletePet(id) {
        try {
            const key = this.datastore.key(['pet', Number(id)]);
            const data = await this.datastore.delete(key);
            return data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }


    async getNewsList() {
        
        try {

            const query = this.datastore.createQuery('news');
            const data = await this.datastore.runQuery(query);

            const newsmodel = new News();
            let ret = newsmodel.map(data[0], this.datastore);

            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };

    async getNews(id) {
        try {
            const key = this.datastore.key(['news', Number(id)]);
            const data = await this.datastore.get(key);
            return data;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async insertNews(title, content, date_created, news_url) {
        try {
            const key = this.datastore.key('news');
            const data = {
                "title": title,
                "content": content, 
                "date_created": date_created,
                "news_url": news_url
            };
            await this.datastore.save({"key":key, "data":data})
            return key;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }

    async updateNews(id, title, content, date_created, news_url) {
        try {
            const key = this.datastore.key(['news', Number(id)]);
            const data = {
                "title": title,
                "content": content, 
                "date_created": date_created,
                "news_url": news_url
            };
            const ret = await this.datastore.save({"key":key, "data":data});
            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async deleteNews(id) {
        try {
            const key = this.datastore.key(['news', Number(id)]);
            const data = await this.datastore.delete(key);
            return data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }


}

module.exports = DataStoreManager;

