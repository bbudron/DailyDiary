const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

if (process.env.REDISTOGO_URL) {
    const redisToGo = require("url").parse(process.env.REDISTOGO_URL);
    let client = redis.createClient(redisToGo.port, redisToGo.hostname);
    client.auth(redisToGo.auth.split(":")[1]);
    client.hget = util.promisify(client.hget);

} else {
    let client = redis.createClient('redis://127.0.0.1:6379');
    client.hget = util.promisify(client.hget);
}


const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashkey = JSON.stringify(options.key || '');

    return this;
}

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
        return exec.apply(this, arguments)
    }
    
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cacheValue = await client.hget(this.hashkey, key);

    if(cacheValue) {
        const doc = JSON.parse(cacheValue)

        return Array.isArray(doc) 
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    client.hset(this.hashkey, key, JSON.stringify(result), 'EX', 10);

    return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
};