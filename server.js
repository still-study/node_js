//Lesson 2

// console.log('Record 1');
//
// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
//
// console.log('Record 5');
//
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));


/*
Напишите программу, которая будет принимать на вход несколько аргументов:
дату и время в формате «час-день-месяц-год». Задача программы — создавать
для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал
состояния таймеров (сколько осталось). По истечении какого-либо таймера, вместо
сообщения о том, сколько осталось, требуется показать сообщение о завершении
его работы. Важно, чтобы работа программы основывалась на событиях.
 */

const EventEmitter = require('events');
const emitter = new EventEmitter();
let [month, day, year, hour, minute, second] = process.argv.slice(2);

// В аргументах нужно указывать время до которого нужно выполнить
// обратный отсчет, в фомате: (месяц, день, год, час, минута, секунда)
// Т.е. если требуется досчитать сколько осталось до: 7 декабря 2021г 19:42:33,
// то в аргументах указываем 12 7 2021 19 42 33
//
// "node server.js 12 7 2021 19 42 33"  =)


let endDate = new Date(`${month} ${day}, ${year} ${hour}:${minute}:${second}`).getTime();
let timer = setInterval(function() {
    let now = new Date().getTime();
    let t = endDate - now;

    if (t >= 0) {

        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % (1000 * 60)) / 1000);

        emitter.emit('timer', days, hours, minutes, seconds);

    } else {
        emitter.emit('end');
    }

}, 1000);

emitter.on('timer', (days, hours, minutes, seconds) => {
    console.log(`Осталось: ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`);
});

emitter.on('end', () => {
    console.log("Время вышло!!!");
})