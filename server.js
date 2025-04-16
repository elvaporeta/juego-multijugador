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

  // Enviar la lista actualizada a todos los jugadores
  io.emit("update-player-list", players);

  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
    players = players.filter(id => id !== socket.id);
    io.emit("update-player-list", players);

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
