import express from 'express';
import cors from 'cors'
import routes from "./routes";

const server = express();

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

server.use(express.json());
// serverExpress.use('/', routes);
server.use(express.static(__dirname + '/public'));
routes(server);

export default server;