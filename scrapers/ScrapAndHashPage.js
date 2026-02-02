const axios = require("axios");
const crypto = require("crypto");

async function getHash(pageUrl) {
  console.log("ytyt");
  const { data } = await axios.get(pageUrl);
  const hash = crypto.createHash("sha256").update(data).digest("hex");

  console.log(pageUrl);
  return hash;
}
module.exports = { getHash };
