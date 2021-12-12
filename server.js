#!/usr/bin/node

//Lesson 4

// В домашнем задании вам нужно будет применить полученные знания к программе,
// которую вы написали по итогам прошлого урока.
//
// Для этого превратите её в консольное приложение, по аналогии с разобранным примером
// и добавьте следующие функции:
// * Возможность передавать путь к директории в программу. Это актуально,
//      когда вы не хотите покидать текущую директорию, но вам необходимо просмотреть файл,
//      находящийся в другом месте;
// * В содержимом директории переходить во вложенные каталоги;
// * При чтении файлов искать в них заданную строку или паттерн.


const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');




inquirer.prompt([
    {
        name: 'isPath',
        type: 'confirm', // input, number, confirm, list, checkbox, password
        message: 'Указать путь до файла? ',
    }
]).then(({ isPath }) => {
    if (isPath) {
        inquirer.prompt([
            {
                name: 'pathName',
                type: 'input', // input, number, confirm, list, checkbox, password
                message: 'Введите путь до файла: ',
            }
        ]).then(({ pathName }) => {
            getList(pathName);
        });
    } else {
        getList(process.cwd());
    }
});



function getList(executionDir) {
    const isFile = (filename) => fs.lstatSync(filename).isFile(); // проверяем на изФайл
    const list = fs.readdirSync(executionDir); // фильтруем только файлы

    inquirer.prompt([
        {
            name: 'dirOrFile',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Выберете файл: ',
            choices: list,
        }
    ]).then(({ dirOrFile }) => {
        const fullPath = path.join(executionDir, dirOrFile);

        if (isFile(fullPath)) {
            const data = fs.readFileSync(fullPath, 'utf-8');

            console.log(data);
        } else {
            getList(fullPath);
        }
    });
}