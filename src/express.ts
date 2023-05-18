const express = require('express');
const cors = require('cors');
const routes = require(`${__dirname}/routes.ts`);

const serverExpress = express();

serverExpress.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

serverExpress.use(express.json());
// serverExpress.use('/', routes);
serverExpress.use(express.static(__dirname + '/public'));
require(__dirname + '\\routes.ts')(serverExpress);
module.exports = serverExpress;