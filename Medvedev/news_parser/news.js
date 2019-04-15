const request = require('request');
const cheerio = require ('cheerio');
const color = require('colors/safe');

const site = 'https://rusvesna.su/';

request(site, (err, response, html) => {
  
  if(!err && response.statusCode === 200) {
    const $ = cheerio.load(html);
    for (let i = 0; i<=5; i++) {
      console.log(color.blue($('.fr-news-t').eq(i).text()))
      console.log($('.fr-news-p').eq(i).text(), '\n')
    }
  }
})