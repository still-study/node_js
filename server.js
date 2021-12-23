const http = require('http');
const port = 5555;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './index.html');
let readStream = fs.createReadStream(filePath);

let server = http.createServer((request, response) => {
    if (request.method === 'GET') {

        readStream = fs.createReadStream(filePath);

        readStream.pipe(response);
    } else if (request.method === 'POST') {
        let data = '';

        request.on('data', chunk => {
            data += chunk;
        });

        request.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);

            response.writeHead(200, { 'Content-Type': 'json'});
            response.end(data);
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

const io = require('socket.io')(server);

let store = {};


io.on('connection', (socket) => {
    console.log(socket.id);
    if (Object.values(store).length > 0) {
        socket.emit('showUserConnected', (Object.values(store)));
    }



    socket.on('CLIENT_MSG', (data) => {
        console.log(data)
        io.emit('SERVER_MSG', {
            user: store[socket.id],
            msg: data.msg
        });
    });

    socket.on('LOGIN', (data) => {
        store[socket.id] = data.msg;
        console.log(Object.values(store));
        io.emit('showUserConnected', (Object.values(store)));
        socket.broadcast.emit('NEW_CONN_EVENT', { msg: `${data.msg} вошел в чат...` });
    })

    socket.on('disconnect', () => {
        console.log('disconnect user ' + socket.id);
        // io.emit('userDisconnected', store[socket.id])
        socket.broadcast.emit('USER_DISC_EVENT', { msg: `${store[socket.id]} покинул чат...` });
        delete store[socket.id];
        io.emit('showUserConnected', (Object.values(store)));
        console.log(store);
    })
});



server.listen(port, 'localhost');