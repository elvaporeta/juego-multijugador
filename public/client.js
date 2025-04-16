const socket = io();
let playerName = '';

// Mostrar pantalla de nombre al cargar
window.onload = () => {
  document.getElementById('nameScreen').style.display = 'block';
};

function startGame() {
  playerName = document.getElementById('nameInput').value.trim();
  if (!playerName) return alert('Escribe un nombre');

  socket.emit('newPlayer', playerName);

  document.getElementById('nameScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  document.getElementById('playerName').textContent = playerName;
}

function sendClick() {
  socket.emit('click');
}

socket.on('updateCount', count => {
  document.getElementById('clickCount').textContent = count;
});

socket.on('updateRanking', ranking => {
  const container = document.getElementById('ranking');
  container.innerHTML = '<h3>Ranking:</h3>';
  ranking.forEach(p => {
    const div = document.createElement('div');
    div.className = 'player';
    div.textContent = `${p.name}: ${p.count}`;
    container.appendChild(div);
  });
});

function toggleRanking() {
  const r = document.getElementById('ranking');
  r.style.display = r.style.display === 'none' ? 'block' : 'none';
}
