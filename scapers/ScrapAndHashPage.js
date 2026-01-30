const axios = require('axios');
const crypto = require('crypto');

async function getHash(pageUrl) {
    const {data} = await axios(pageUrl);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log(hash);
    return hash;
}
module.exports = {getHash};
getHash('https://github.com/WiiStem/node-js-assignment-2/blob/main/server.js');