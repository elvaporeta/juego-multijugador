const socket = io();
let playerId = null;
let playerName = '';
let clickCount = 0;

function registerName() {
  const input = document.getElementById('nameInput');
  playerName = input.value.trim();
  if (playerName) {
    socket.emit('register', playerName);
  }
}

function sendClick() {
  if (playerName) {
    clickCount++;
    document.getElementById('clicksDisplay').innerText = `Clics: ${clickCount}`;
    socket.emit('click');
  }
}

function showRanking() {
  socket.emit('requestRanking');
}

socket.on('rankingData', (ranking) => {
  const container = document.getElementById('ranking');
  container.innerHTML = '<h3>Ranking:</h3>';
  const list = document.createElement('ol');
  ranking.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = `${entry.name}: ${entry.clicks} clics`;
    list.appendChild(item);
  });
  container.appendChild(list);
});
