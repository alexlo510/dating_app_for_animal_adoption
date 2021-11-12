
const CONFIG = require('../common/config');

class News {

    constructor(id, title, content, date_created, news_url) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date_created = date_created;
        this.news_url = news_url;
        this.self = CONFIG.newsbaseurl+"/"+this.id;
    }

    print() {
        console.log(`id: ${this.id}`);
        console.log(`title: ${this.title}`);
        console.log(`content: ${this.content}`);
        console.log(`date_created: ${this.date_created}`);
        console.log(`news_url: ${this.news_url}`);
        console.log(`owner: ${this.self}`);
    }

    map(data, datastore) {
        let ret =[];
        for (let i=0;i<data.length;i++) {
            let item = {};
            item.id = data[i][datastore.KEY].id;
            item.title = data[i].title;
            item.content = data[i].content;
            item.date_created = data[i].date_created;
            item.news_url = data[i].news_url;
            item.self = CONFIG.newsbaseurl+"/"+item.id
            ret.push(item);
        }
        return ret;
    }

}

module.exports = News;