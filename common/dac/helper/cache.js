/** @module */

const memoryCache = require("memory-cache");

/** */
exports.get = key => {
    return memoryCache.get(key);
};

/** */
exports.set = (key, o) => {
    return memoryCache.put(key, o, 60 * 1000, expired);
};

exports.clear = () => memoryCache.clear();

function expired(key) {
    console.log(key + " expired.");
}
