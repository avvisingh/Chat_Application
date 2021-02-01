const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT;
const publicDirpath = path.join(__dirname, './public');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(publicDirpath));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/routes");

app.use(routes);

// Start our server so that it can begin listening to client requests.
server.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server now up and running on port ${PORT}`);
});