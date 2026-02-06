export function startCatchGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 400;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let playerX = 130;
  let hearts = [];
  let caught = 0;

  function spawnHeart() {
    hearts.push({ x: Math.random() * 280, y: -20 });
  }

  function update() {
    ctx.clearRect(0, 0, 300, 400);

    // draw player
    ctx.fillText("💖", playerX, 380);

    // update hearts
    hearts.forEach((h) => {
      h.y += 2;
      ctx.fillText("❤️", h.x, h.y);

      if (h.y > 360 && Math.abs(h.x - playerX) < 30) {
        caught++;
        h.y = 9999;
      }
    });

    if (caught >= 10) {
      alert("You caught my heart! 💘");
      return;
    }

    requestAnimationFrame(update);
  }

  window.onkeydown = (e) => {
    if (e.key === "ArrowLeft") playerX -= 20;
    if (e.key === "ArrowRight") playerX += 20;
  };

  setInterval(spawnHeart, 800);
  update();
}
