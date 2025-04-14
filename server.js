const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

let counter = 0;

io.on('connection', socket => {
  console.log('Jugador conectado:', socket.id);

  // Enviar el contador actual al jugador nuevo
  socket.emit('counter', counter);

  // Cuando alguien hace clic
  socket.on('increment', () => {
    counter++;
    io.emit('counter', counter); // actualizar a todos
  });

  socket.on('disconnect', () => {
    console.log('Jugador desconectado:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
