console.log("ca marche")
const http = require('http');
const app = require('../Backend/app');



// // SERVER FINAL // //


const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port;
    }

    return false
};

//  // ERROR HANDLER // //
const port = normalizePort(process.env.port || "3000")
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }


    const adresse = server.address();
    const bind = typeof address === "string" ? "pipe" + address : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + "require elevated privilége");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }

};

// // MISE EN PLACE SERVER // //

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : 'port' + port;
    console.log('listen on' + bind);
});

server.listen(port);

// // SERVER FINAL // //