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
         io.emit('user-connected', usuarios);
      }
   });

   socket.on('send-message', ({message, image}) => {
      io.emit('send-message', {message, user: socket.username, image});
   });

   socket.on('disconnect', () => {
      delete usuarios[socket.username];
      io.emit('user-connected', usuarios);
   }); 
});



