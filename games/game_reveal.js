export function startRevealGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 100px)";
  board.style.gap = "10px";

  let flipped = 0;

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.style.width = "100px";
    tile.style.height = "100px";
    tile.style.background = "#ffb6c1";
    tile.style.display = "flex";
    tile.style.justifyContent = "center";
    tile.style.alignItems = "center";
    tile.style.fontSize = "2rem";
    tile.style.cursor = "pointer";

    tile.onclick = () => {
      if (!tile.dataset.flipped) {
        tile.dataset.flipped = true;
        tile.textContent = "❤️";
        flipped++;

        if (flipped === 9) {
          setTimeout(() => alert("You revealed my heart! 💘"), 300);
        }
      }
    };

    board.appendChild(tile);
  }

  container.appendChild(board);
}
