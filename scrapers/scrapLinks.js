const axios = require("axios");
const cheerio = require("cheerio");
async function scrapeLinks(url) {
  const search = ["blob","tree"];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = new Set();
    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href.includes(search[0] || search[1])) links.add(href);
    });
    return links;
  } catch (error) {
    console.error("Error fetching URL: ", error.message);
  }
}
module.exports = { scrapeLinks };
