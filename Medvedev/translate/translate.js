const readline = require('readline');
const colors = require('colors/safe')
const request = require('request');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(colors.yellow(
`Добро пожаловать. Здесь занимаются переводом.
Чтобы продолжить нажмите enter. Для выхода
введите n, exit или no`
));
rl.on('line', (cmd) => {
  if (cmd === 'exit' || cmd === 'no' || cmd === 'n') {
    console.log('goodbye');
    rl.close();
  } else if (cmd === 'y' || cmd ==='') {
    const guess = 'Введите текст для перевода\n';
    rl.question(guess, (answer) => {
      const site = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190415T112300Z.8b75dfaa80a8a49c.0a0eaf4c087df0852f7c2c672410051f75c45bf4&text=${encodeURI(answer)}&lang=ru-en`;
      request(site, (err, response, html) => {
        if(!err && response.statusCode === 200) {
          console.log(colors.green(JSON.parse(html).text[0]), '\n');
          console.log(colors.yellow('Переведём что-нибудь ещё? (y или нажатие на Enter - да, n, no, exit = нет'));
        } else {
        console.log('oшибка')
      }
      })
    })
  }
});