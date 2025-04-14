const socket = io();

const countEl = document.getElementById('count');
const clickBtn = document.getElementById('clickBtn');

clickBtn.addEventListener('click', () => {
  socket.emit('increment');
});

socket.on('counter', (count) => {
  countEl.textContent = count;
});
