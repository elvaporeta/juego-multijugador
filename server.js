const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

let players = {};

io.on('connection', socket => {
  let playerId = socket.id;

  socket.on('newPlayer', name => {
    players[playerId] = { name, count: 0 };
    updateRanking();
  });

  socket.on('click', () => {
    if (players[playerId]) {
      players[playerId].count++;
      io.to(playerId).emit('updateCount', players[playerId].count);
      updateRanking();
    }
  });

  socket.on('disconnect', () => {
    delete players[playerId];
    updateRanking();
  });
});

function updateRanking() {
  const sorted = Object.values(players)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  io.emit('updateRanking', sorted);
}

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
