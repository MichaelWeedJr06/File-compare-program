const { scrapeLinks } = require("./scrapers/scrapLinks.js");
const { getHash } = require("./scrapers/ScrapAndHashPage.js");
const Main = async (links) => {
  const hostURL = "https://raw.githubusercontent.com";

  try {
    const githubLinks = links;
    let hashes = [];

    for (let i = 0; i < githubLinks.length; i++) {
      let temp = [];
      let site_links = await scrapeLinks(githubLinks[i]);
      for (const link of site_links) {
        let rightLink = link.replace("/blob", "/refs/heads");
        const subHash = await getHash(`${hostURL}${rightLink}`);
        temp.push(subHash);
      }
      hashes.push(temp);
    }

    for (let i = 0; i < hashes.length; i++) {
      for (let j = i + 1; j < hashes.length; j++) {
        let same = 0;
        const set = new Set(hashes[i]);

        for (const hash of hashes[j]) {
          if (set.has(hash)) same++;
        }
        return [same, hashes[0].length];
      }
    }
  } catch (err) {
    console.error(`Error reading in file: ${err}`);
  }
};
module.exports = { Main };
