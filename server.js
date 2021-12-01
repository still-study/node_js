//Lesson 1

const colors = require("colors/safe");
console.log(colors.blue("Lesson 1"));

let argv = process.argv.splice(2);

let start;
let end;

let val = 1;
let primeNum = [];

// проверка на присутствие двух аргументов
if (typeof argv[0] !== 'undefined' && typeof argv[1] !== 'undefined'){
    start = +argv[0];
    end = +argv[1];

    // проверка перобразованного аргумента в тип number, если строка, то выведет NaN
    if (isNaN(start) || isNaN(end)) {
        console.log(colors.red("Ошибка! Введенные данные не являются числом!"));
        return;
    }
    getPrimeNumber();
} else {
    console.log(colors.red("Неверное количество аргументов! Передайте два аргумента."));
    return;
}

function getPrimeNumber() {
    loop: // метка цикла
        for (let i = start; i <= end; i++) {
            if (i !== 1 && i !== 0) {
                for (let j = 2; j < i; j++) {
                    if (i % j === 0) {
                        continue loop;
                    }
                }

                switch (val){
                    case val = 1:
                        console.log(colors.green(i));
                        val ++;
                        break;
                    case val = 2:
                        console.log(colors.yellow(i));
                        val++;
                        break;
                    case val = 3:
                        console.log(colors.red(i));
                        val = 1;
                        break;

                }
                primeNum.push(i);
            }
        }
    if (primeNum.length === 0) {
        console.log(colors.red("Простых чисел в диапазоне нет!"));
    }
}
