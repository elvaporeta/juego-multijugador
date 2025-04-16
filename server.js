const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let players = {}; // socket.id => { name, clicks }

io.on('connection', socket => {
  console.log('Jugador conectado:', socket.id);

  players[socket.id] = { name: '', clicks: 0 };

  socket.on('register', name => {
    if (players[socket.id]) {
      players[socket.id].name = name;
    }
  });

  socket.on('click', () => {
    if (players[socket.id]) {
      players[socket.id].clicks++;
    }
  });

  socket.on('requestRanking', () => {
    const ranking = Object.values(players)
      .filter(p => p.name)
      .sort((a, b) => b.clicks - a.clicks);
    socket.emit('rankingData', ranking);
  });

  socket.on('disconnect', () => {
    console.log('Jugador desconectado:', socket.id);
    delete players[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
