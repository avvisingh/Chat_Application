const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT;
const publicDirpath = path.join(__dirname, './public');

app.use(express.static(publicDirpath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/routes");

app.use(routes);

io.on('connection', () => {
    console.log('New web-socket connection')
})

server.listen(PORT, () => {
  console.log(`Server now up and running on port ${PORT}`);
});