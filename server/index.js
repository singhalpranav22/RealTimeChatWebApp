const cors = require('cors');
const httpServer =require('http');
http.createServer(function (req, res) {
}).listen(80, '192.168.0.1');
const io = require("socket.io")(httpServer.listen(8000,"192.168.0.138"), {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });

const users = {};

// const express =require('express');
// const app = express();
// app.use(cors());
io.on("connection" , socket => {
socket.on('new-user-joined',nameP => {
    users[socket.id] = nameP;
    console.log("New user : ",nameP,socket.id);
    socket.broadcast.emit('user-joined',nameP);
});
socket.on("send" , message =>{
 socket.broadcast.emit('receive',{message : message , name: users[socket.id]});
});
});