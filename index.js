require('dotenv').config({});
require('./src/database/MongoDBConnect')
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const Port = 7000;

server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});