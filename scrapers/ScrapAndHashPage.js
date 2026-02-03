const axios = require("axios");
const crypto = require("crypto");

async function getHash(pageUrl) {
  const { data } = await axios.get(pageUrl);
  const hash = crypto.createHash("sha256").update(data.toString()).digest("hex");
  return hash;
}
module.exports = { getHash };
