const readline = require('readline');
const colors = require('colors/safe');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(colors.green('Hi, Shall we set timout to send you beep signals after?'));
console.log('possible answers: yes or y, no or n, exit');

rl.on('line', (cmd) => {
  if (cmd === 'exit' || cmd === 'no' || cmd === 'n') {
    console.log('goodbye');
    rl.close();
  } else if (cmd === 'yes' || cmd === 'y') {
    const guess = ` ${colors.green('Please, input timeout in minutes \n')}`;
    rl.question(guess, (answer) => {
      answer *= 1;
      const milliSeconds = answer * 60 * 1000
      setTimeout(() => {
        interval = setInterval(() => cursor.beep(), 1000)
        //отвязывает нашу программу от ожидания интервала. Жмём n и спокойно выходим, интревал прекращает работу.
        setTimeout(() => interval.unref(), 10)
      }, milliSeconds)
      console.log(`Please, wait for a beep in ${answer}min. Input no or n, for exit`)
    })
  }
});