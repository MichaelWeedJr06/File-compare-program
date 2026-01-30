 const axios = require('axios');
 const cheerio = require('cheerio');

 async function scrapeLinks(url, subdomain) {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const links = new Set;

        $('a').each((_, element) => {
            const href = $(element).attr('href');
            if (href.includes(`${subdomain}/blob/`)) links.add(href);
        });
        console.log(links);
        return links;
    }catch(error){
        console.error("Error fetching URL: ", error.message);
    }
}
scrapeLinks('https://github.com/NoahPrest0402/Node-Assignment-2','/NoahPrest0402/Node-Assignment-2' );
module.exports = {scrapeLinks};