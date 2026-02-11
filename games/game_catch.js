export function startCatchGame(onComplete) {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  // Create grid element
  const grid = document.createElement("div");
  grid.id = "grid";
  grid.style.width = "300px";
  grid.style.height = "400px";
  grid.style.overflow = "hidden";
  grid.style.borderRadius = "20px";
  grid.style.boxShadow = "0 10px 30px rgb(0, 0, 0)";
  grid.style.position = "relative"; // Ensure absolute positioning works within grid
  container.appendChild(grid);

  // FINISH SCREEN
  let finishScreen = document.createElement("img");
  finishScreen.id = "finishImg";
  finishScreen.src = "assets/peach_jump_goma.gif";
  finishScreen.style.display = "none";
  container.appendChild(finishScreen);

  // BUCKET ELEMENT
  const bucket = document.createElement("img");
  bucket.src = "assets/goma_empty.gif";
  bucket.style.position = "absolute";
  bucket.style.bottom = "10px";
  bucket.style.left = "130px";
  bucket.style.height = "80px";
  bucket.style.width = "auto";
  bucket.style.transition = "left 0.05s linear";
  bucket.style.objectFit = "contain";
  bucket.style.objectPosition = "center";

  grid.appendChild(bucket);

  // BUCKET STATES
  const bucket1 = "assets/goma_empty.gif";
  const bucket2 = "assets/goma_half.png";
  const bucket3 = "assets/goma_full.gif";

  let playerX = 130;
  let hearts = [];
  let caught = 0;
  let isGameOver = false; //flag to prevent multiple alerts

  function updateBucketAsset() {
    bucket.classList.remove("state-empty", "state-half", "state-full");

    if (caught < 3) {
      bucket.src = bucket1;
      bucket.classList.add("state-empty");
    } else if (caught < 6) {
      bucket.src = bucket2;
      bucket.classList.add("state-half");
    } else {
      bucket.src = bucket3;
      bucket.classList.add("state-full");
    }
  }

  // SPAWN HEART
  function spawnHeart() {
    if (isGameOver) return;

    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 280 + "px";
    heart.style.top = "-20px";
    heart.style.fontSize = "28px";

    grid.appendChild(heart);

    hearts.push({
      el: heart,
      x: parseFloat(heart.style.left),
      y: -20,
      caught: false,
    });
  }

  // GAME LOOP
  function update() {
    if (isGameOver) return;

    hearts.forEach((h) => {
      h.y += 2;
      h.el.style.top = h.y + "px";

      const heartRect = h.el.getBoundingClientRect();
      const bucketRect = bucket.getBoundingClientRect();

      // collision
      if (
        !h.caught &&
        heartRect.bottom >= bucketRect.top &&
        heartRect.left < bucketRect.right &&
        heartRect.right > bucketRect.left
      ) {
        h.caught = true;
        caught++;
        updateBucketAsset();
        h.el.remove();

        // POP ANIMATION
        bucket.classList.remove("bucket-pop"); // reset
        void bucket.offsetWidth; // force reflow
        bucket.classList.add("bucket-pop"); // replay animation
      }

      // remove off-screen
      if (h.y > 420) {
        h.el.remove();
      }
    });

    hearts = hearts.filter((h) => !h.caught && h.y < 420);

    // WIN CONDITION
    if (caught >= 10) {
      grid.innerHTML = ""; // Clear the grid
      grid.style.display = "none";
      isGameOver = true;
      finishScreen.style.display = "block";

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);

      return;
    }

    requestAnimationFrame(update);
  }

  // KEYBOARD CONTROL
  window.onkeydown = (e) => {
    if (isGameOver) return;
    if (e.key === "ArrowLeft") playerX -= 20;
    if (e.key === "ArrowRight") playerX += 20;

    bucket.style.left = playerX + "px";
  };

  // DRAG CONTROL
  let isDragging = false;

  grid.addEventListener("mousedown", () => {
    if (!isGameOver) isDragging = true;
  });
  grid.addEventListener("mouseup", () => (isDragging = false));
  grid.addEventListener("mousemove", (e) => {
    if (isDragging && !isGameOver) {
      const rect = grid.getBoundingClientRect();
      playerX = e.clientX - rect.left - 30;
      bucket.style.left = playerX + "px";
    }
  });

  grid.addEventListener("touchstart", () => {
    if (!isGameOver) isDragging = true;
  });
  grid.addEventListener("touchend", () => (isDragging = false));
  grid.addEventListener("touchmove", (e) => {
    if (!isDragging || isGameOver) return;
    const rect = grid.getBoundingClientRect();
    playerX = e.touches[0].clientX - rect.left - 30;
    bucket.style.left = playerX + "px";
  });

  // START GAME
  setInterval(spawnHeart, 800);
  update();
}
