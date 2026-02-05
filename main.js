const { readFile, writeFile } = require("fs").promises;
const { scrapeLinks } = require("./scrapers/scrapLinks.js");
const { getHash } = require("./scrapers/ScrapAndHashPage.js");
const readFiles = async (filename) => {
const hostURL = "https://raw.githubusercontent.com";

  try {
    const data = await readFile(filename, "utf8");
    const githubLinks = data.split(",");
    let hashes = [];

    for (let i = 0; i < githubLinks.length; i++) {
      let temp = [];
      let site_links = await scrapeLinks(githubLinks[i]);
      console.log(site_links);
      for (const link of site_links) {
        let rightLink = link.replace("/blob", "/refs/heads");
        const subHash = await getHash(`${hostURL}${rightLink}`);
        temp.push(subHash);
      }
      hashes.push(temp);
    }
    same_count = [];
    for (let i = 0; i < hashes.length; i++) {
  for (let j = i + 1; j < hashes.length; j++) {
    let same = 0;
    const set = new Set(hashes[i]);

    for (const hash of hashes[j]) {
      if (set.has(hash)) same++;
    }
    same_count.push(same);
    console.log(`Repo ${i} vs Repo ${j}: ${same} matches`);
  }
}
  } catch (err) {
    console.error(`Error reading in file: ${err}`);
  }
};
readFiles("sampleLinks.csv");
