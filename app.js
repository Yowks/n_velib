const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


dotenv.config();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Router
const routes = require('./routes/routes');
app.use('/', routes);



server.listen(3000, () => { });