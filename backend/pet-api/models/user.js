
const CONFIG = require('../common/config');

class User {

    constructor(id, owner_id, creation_date) {
        this.id = id;
        this.owner_id = owner_id;
        this.creation_date = creation_date;
    }

    mapUsers(data, datastore) {
        let ret =[];
        for (let i=0;i<data.length;i++) {
            let item = {};
            item.id = data[i][datastore.KEY].id;
            item.owner_id = data[i].owner_id;
            item.creation_date = data[i].creation_date;
            ret.push(item);
        }
        return ret;
    }
}

module.exports = User;