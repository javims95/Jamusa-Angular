const http = require('http');
const app = require('./app');
const config = require('./config.js');

const port = config.PORT;

const server = http.createServer(app);

server.listen(port);