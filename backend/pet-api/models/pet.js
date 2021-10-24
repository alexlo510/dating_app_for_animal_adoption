const CONFIG = require('../common/config');

class Pet {
    
    constructor(id, availability, breed, date_created, description, disposition, name, picture_url, type, adoptedby) {
        this.id = id;
        this.availability = availability;
        this.breed = breed;
        this.date_created = date_created;
        this.description = description;
        this.disposition = disposition;
        this.name = name;
        this.picture_url = picture_url;
        this.type = type;
        this.adoptedby = adoptedby;
        this.self = CONFIG.petbaseurl+"/"+this.id;
    }

    print() {
        console.log(`id: ${this.id}`);
        console.log(`availability: ${this.availability}`);
        console.log(`breed: ${this.breed}`);
        console.log(`date_created: ${this.date_created}`);
        console.log(`description: ${this.description}`);
        console.log(`disposition: ${this.disposition}`);
        console.log(`name: ${this.name}`);
        console.log(`picture_url: ${this.picture_url}`);
        console.log(`type: ${this.type}`);
        console.log(`adoptedby: ${this.adoptedby}`);
        console.log(`owner: ${this.self}`);
    }

    map(data, datastore) {
        let ret =[];

        let ip = process.env.IP || CONFIG.ip;
        let port = process.env.PORT || CONFIG.port;

        for (let i=0;i<data.length;i++) {
            let item = {};
            item.id = data[i][datastore.KEY].id;
            item.availability = data[i].availability;
            item.breed = data[i].breed;
            item.date_created = data[i].date_created;
            item.description = data[i].description;
            item.disposition = data[i].disposition;
            item.name = data[i].name;
            item.picture_url = data[i].picture_url;
            item.type = data[i].type;
            item.adoptedby = data[i].adoptedby;
            item.self = CONFIG.petbaseurl+"/"+item.id;
            ret.push(item);
        }
        return ret;
    }

}

module.exports = Pet;