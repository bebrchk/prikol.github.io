const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { 
  cors: { origin: "*" } 
});

let content = "";
let images = {};

io.on('connection', (socket) => {
  socket.emit('init', { content, images });
  
  socket.on('contentUpdate', (newContent) => {
    content = newContent;
    socket.broadcast.emit('contentUpdate', newContent);
  });
  
  socket.on('imageMove', (data) => {
    images[data.id] = data;
    socket.broadcast.emit('imageMove', data);
  });
});

http.listen(3000, () => console.log('Server running'));