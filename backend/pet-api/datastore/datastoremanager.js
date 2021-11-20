const { Datastore } = require('@google-cloud/datastore');
const { entity } = require('@google-cloud/datastore/build/src/entity');

const Pet = require('../models/pet');
const News = require('../models/news');
const CONFIG = require('../common/config');
const User = require('../models/user');

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


    async getPetsBySearch(type, availability, breed, disposition){
        try {
            console.log(type);
            console.log(availability);
            console.log(breed);
            console.log(disposition);
            
            let query = this.datastore.createQuery('pet');

            if (type != undefined) {
                console.log("Filtering by type");
                query.filter('type', '=', type);
            }
            
            if (availability != undefined) {
                console.log("Filtering by availability");
                query.filter('availability', "=", availability);
            }

            // if (disposition != undefined) {
            //     console.log("Filtering by disposition");
            //     //disposition = "[\"Good with other animals\"]";
            //     console.log("disposition: ", disposition);
            //     query.filter('disposition', "=", disposition);
            // }

            if (breed != undefined) {
                console.log("Filtering by breed");
                query.filter('breed', "=", breed);
            }

            const data = await this.datastore.runQuery(query);

            console.log("filtered data: ", data);

            let ret = {};

            if (data != 'undefined' || data != null) {
                const petmodel = new Pet();
                ret = petmodel.map(data[0], this.datastore);
            }

            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

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

    async getUsers() {
        
        try {
            const query = this.datastore.createQuery('users');
            const data = await this.datastore.runQuery(query);

            const usermodel = new User();
            let ret = usermodel.map(data[0], this.datastore);

            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };

    async getUser(id) {
        try {
            const key = this.datastore.key(['users', Number(id)]);
            const data = await this.datastore.get(key);
            return data;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async getUserByOwnerId(owner_id) {

        try {
            const query = this.datastore.createQuery('users').filter('owner_id','=', owner_id);
            const data = await this.datastore.runQuery(query);

            const usermodel = new User();
            let ret = usermodel.map(data[0], this.datastore);
            return ret;
            
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }

    async updateUser(id, owner_id, user_alias, date_created, is_admin, email_notifications) {
        try {
            const key = this.datastore.key(['users', Number(id)]);

            const data = {
                "owner_id": owner_id,
                "user_alias": user_alias,
                "date_created": date_created,
                "is_admin": is_admin,
                "email_notifications": email_notifications
            };
            const ret = await this.datastore.save({"key":key, "data":data});
            return ret;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

}

module.exports = DataStoreManager;

