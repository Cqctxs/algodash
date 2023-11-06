require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { Server } = require("socket.io");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const socketController = require('./controllers/socketController');

//Connect MongoDB
connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socketController.joinRoom(io, socket);
  socketController.sendUpdate(io, socket);
  socketController.win(io, socket);
  socketController.removeRoom(io, socket);
});

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/problems', require('./routes/api/problems'));
app.use('/users', require('./routes/api/users'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });
});