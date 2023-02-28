const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

const usuarios = {};

server.listen(PORT, () => {
   console.log('Servidor ejecutando en puerto: ' + PORT);
});

app.use(express.static(path.join(__dirname, 'src')));

io.on('connection', (socket) => {

   socket.on('register', ( username ) => {
      if ( usuarios[username] ) {
         socket.emit('login-issue');
         return;
      } else {
         usuarios[username] = username;
         socket.username = username;
         socket.emit('login');
      }
   });

   socket.on('send-message', (message) => {
      io.emit('send-message', {message, user: socket.username});
   });

   socket.on('disconnect', () => {
      delete usuarios[socket.username];
   }); 
});



