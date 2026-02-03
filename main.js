const { readFile, writeFile } = require("fs").promises;
const { scrapeLinks } = require("./scrapers/scrapLinks.js");
const { getHash } = require("./scrapers/ScrapAndHashPage.js");
const { URL } = require("url");
const readFiles = async (filename) => {
  const hostURL = "https://raw.githubusercontent.com";

  try {
    const data = await readFile(filename, "utf8");
    const githubLinks = data.split(",");
    let hashes = [];

    for (let i = 0; i < githubLinks.length; i++) {
      let temp = [];
      let site_links = await scrapeLinks(githubLinks[i]);
      //console.log(githubLinks);
      console.log(site_links);
      for (const link of site_links) {
        let rightLink = link.replace("/blob", "/refs/heads");
        const subHash = await getHash(`${hostURL}${rightLink}`);
        temp.push(subHash);
        console.log(temp);
      }
      //console.log(temp);
      hashes.push(temp);
    }
    for (let k = 0; k < hashes.length; k++) {}
  } catch (err) {
    console.error(`Error reading in file: ${err}`);
  }
};
readFiles("sampleLinks.csv");
