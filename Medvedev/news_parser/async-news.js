//Посмотрим как оборачивать непромисные пакеты в Promise. Для асинхронщины - промисы являются лучшим вариантом, а
//async await, позволяют писать достаточно декларативно, понятно и просто

const request = require('request');
const cheerio = require('cheerio');

function sendRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body)=>{
      if(err) {
        reject(err);
      }
      resolve(cheerio.load(body));
    });
  })
}
async function fetchNews(url) {
  const $newsPage = await sendRequest(url);
  // получим массив всех наших элементов
  // [{ title:
  //   'СМИ узнали об интересе «Зенита» к 19-летнему футболисту «Фенербахче»',
  //  href:
  //   'https://sport.rbc.ru/news/5cbd8bc99a79477a6ae6aa55?from=from_main' } ]
  const newsHeads = Array.prototype.slice.call($newsPage('.main__feed__link'),0)
                    .map(item=>({title: $newsPage(item).text().replace(/\n/g, '').trim(), href: $newsPage(item).attr('href')}));
  const news = await Promise.all(newsHeads.map(async item => {
    const $item = await sendRequest(item.href);
    const content = $item('.article__text__overview').eq(0).text().replace(/\n/g, '').trim();

    // мы получим резолв всех промисов в массиве. Для того, чтобы его дождаться применям Promise.all() и добавляем await
    //ждём пока отработают запросы по всем новостям из списка
    return {...item, content}
  }))
  console.log(news);
}

fetchNews('https://www.rbc.ru/');