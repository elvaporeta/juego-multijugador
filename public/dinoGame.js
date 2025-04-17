function startDinoGame() {
  const container = document.getElementById('dinoGame');
  container.innerHTML = '<h2>Juego del Dinosaurio</h2><canvas id="dinoCanvas" width="600" height="200"></canvas><button onclick="backToMenu()">Volver</button>';

  const canvas = document.getElementById('dinoCanvas');
  const ctx = canvas.getContext('2d');
  let dinoY = 150, jumping = false, gravity = 0.9, velocity = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(50, dinoY, 40, 40);
    requestAnimationFrame(draw);
  }

  function jump() {
    if (!jumping) {
      velocity = -15;
      jumping = true;
      socket.emit('click');
    }
  }

  function update() {
    dinoY += velocity;
    velocity += gravity;
    if (dinoY >= 150) {
      dinoY = 150;
      jumping = false;
    }
    requestAnimationFrame(update);
  }

  canvas.onclick = jump;
  draw();
  update();
}