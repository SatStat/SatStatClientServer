const express = require('express');

const cors = require('cors');
const routes = require(`${__dirname}/routes.ts`);

const server = express();

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

server.use(express.json());
// server.use('/', routes);
server.use(express.static(__dirname + '/public'));
require(__dirname + '\\routes.ts')(server);
module.exports = server;
export {}