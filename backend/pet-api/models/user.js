
const CONFIG = require('../common/config');

class User {

    constructor(id, owner_id, user_alias, date_created, is_admin, email_notifications) {
        this.id = id;
        this.owner_id = owner_id;
        this.user_alias = user_alias;
        this.date_created = date_created;
        this.is_admin = is_admin;
        this.email_notifications = email_notifications;
        this.self = CONFIG.userbaseurl+"/"+this.id;
    }

    map(data, datastore) {
        let ret =[];
        for (let i=0;i<data.length;i++) {
            let item = {};
            item.id = data[i][datastore.KEY].id;
            item.owner_id = data[i].owner_id;
            item.user_alias = data[i].user_alias;
            item.date_created = data[i].date_created;
            item.is_admin = data[i].is_admin;
            item.email_notifications = data[i].email_notifications;
            ret.push(item);
        }
        return ret;
    }

    jsonData() {
        
        return {
            "id": this.id,
            "owner_id": this.owner_id,
            "user_alias": this.user_alias,
            "date_created": this.date_created,
            "is_admin": this.is_admin,
            "email_notifications": this.email_notifications,
            "self": this.self
        };
    }

}

module.exports = User;