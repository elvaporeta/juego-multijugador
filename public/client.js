const socket = io();
let playerName = '';
let clickCount = 0;

function startGame() {
  const input = document.getElementById('nameInput');
  playerName = input.value.trim();
  if (!playerName) return alert('Escribe un nombre');

  socket.emit('newPlayer', playerName);

  document.getElementById('nameScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  document.getElementById('playerName').textContent = playerName;
}

const socket = io();
let playerName = '';

function $(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll('#screens > div').forEach(div => div.style.display = 'none');
  $(id).style.display = 'block';
}

function startGame() {
  const name = $('nameInput').value.trim();
  if (!name) return alert('Escribe tu nombre');
  playerName = name;
  socket.emit('newPlayer', name);
  $('playerName').textContent = name;
  showScreen('mainMenu');
}

function sendClick() {
  socket.emit('click');
}

socket.on('updateCount', count => {
  $('clickCount').textContent = count;
});

socket.on('updateRanking', ranking => {
  const r = $('ranking');
  r.innerHTML = '<h3>Ranking:</h3>';
  ranking.forEach(p => {
    const div = document.createElement('div');
    div.textContent = `${p.name}: ${p.count}`;
    r.appendChild(div);
  });
});

function toggleRanking() {
  const r = $('ranking');
  r.style.display = r.style.display === 'none' ? 'block' : 'none';
}

function showGame(game) {
  showScreen(game + 'Game');
  if (game === 'dino') startDinoGame();
  if (game === 'miner') startMinerGame();
  if (game === 'fight') startFightGame();
}
