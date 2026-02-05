const axios = require("axios");
const cheerio = require("cheerio");
async function scrapeLinks(url) {
  const search = "blob";
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = new Set();
    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href.includes(search)) links.add(href);
    });
    return links;
  } catch (error) {
    console.error("Error fetching URL: ", error.message);
  }
}
module.exports = { scrapeLinks };
