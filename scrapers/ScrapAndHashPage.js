const axios = require("axios");
const crypto = require("crypto");

async function getHash(pageUrl) {
  let { data } = await axios.get(pageUrl);
  let normalizedData = normalizeAndCleanString(data.toString());
  
  
  const hash = crypto.createHash("sha256").update(normalizedData).digest("hex");
  return hash;
}
function normalizeAndCleanString(str){
 let normalized = str.normalize('NFC');
 let lowercased = normalized.toLowerCase();
 let trimmed = lowercased.trim();
 let final = trimmed.replace(/\s+/g, ' ');

 return final;

}

getHash('https://raw.githubusercontent.com/NoahPrest0402/Node-Assignment-2/refs/heads/main/server.js')
module.exports = { getHash };

