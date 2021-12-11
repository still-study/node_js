//Lesson 3

// По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб.
// Напишите программу, которая находит в этом файле все записи
// с ip-адресами 89.123.1.41 и 34.48.240.111, а также сохраняет их в отдельные файлы
// с названием “%ip-адрес%_requests.log”.

const fs = require('fs');
const ip = ['34.48.240.111', '89.123.1.41'];

const readStream = new fs.ReadStream('./access.log', 'utf8');

readStream.on('data', data => search(data));

function search(data) {
    ip.forEach((ip) => {
        let reg = new RegExp(`^.*(${ip}).*$`, 'gm');
        let result = data.match(reg);
        result.forEach((string) => {
            console.log(string);
            fs.writeFile(`./${ip}_requests.log`, string + '\n', {flag: 'a'},(err) => console.log(err));
        });
    });
}