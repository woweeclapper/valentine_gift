export function startCatchGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  // FINISH SCREEN
  let finishScreen = document.createElement("img");
  finishScreen.id = "finishImg";
  finishScreen.src = "assets/peach_jump_goma.gif";
  finishScreen.style.display = "none";
  container.appendChild(finishScreen);

  // CANVAS
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 400;
  canvas.style.position = "relative";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.font = "32px serif";

  // PLAYER GIFS
  const bucket1 = new Image();
  bucket1.src = "assets/goma_empty.gif";

  const bucket2 = new Image();
  bucket2.src = "assets/goma_half.png";

  const bucket3 = new Image();
  bucket3.src = "assets/goma_full.gif";

  let playerX = 130;
  let hearts = [];
  let caught = 0;
  let isGameOver = false; //flag to prevent multiple alerts

  function getBucketImage() {
    if (caught < 4) return bucket1;
    if (caught < 8) return bucket2;
    return bucket3;
  }

  function spawnHeart() {
    hearts.push({ x: Math.random() * 280, y: -20 });
  }

  function update() {
    ctx.clearRect(0, 0, 300, 400);

    // draw bucket GIF
    const bucketImg = getBucketImage();
    ctx.drawImage(bucketImg, playerX - 20, 350, 50, 50);

    // update hearts
    hearts.forEach((h) => {
      h.y += 2;
      ctx.fillText("❤️", h.x, h.y);

      if (h.y > 340 && Math.abs(h.x - playerX) < 30) {
        caught++;
        h.y = 9999;
      }
    });

    if (caught >= 10) {
      finishScreen.style.display = "block";
      return;
    }

    requestAnimationFrame(update);
  }

  // KEYBOARD CONTROL
  window.onkeydown = (e) => {
    if (e.key === "ArrowLeft") playerX -= 20;
    if (e.key === "ArrowRight") playerX += 20;
  };

  // DRAG CONTROL
  let isDragging = false;

  canvas.addEventListener("mousedown", () => (isDragging = true));
  canvas.addEventListener("mouseup", () => (isDragging = false));
  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) playerX = e.offsetX;
  });

  canvas.addEventListener("touchstart", () => (isDragging = true));
  canvas.addEventListener("touchend", () => (isDragging = false));
  canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    playerX = e.touches[0].clientX - rect.left;
  });

  setInterval(spawnHeart, 800);
  update();
}
