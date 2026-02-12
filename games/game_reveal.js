export function startRevealGame(onComplete) {
  const container = document.getElementById("game-container");
  container.innerHTML = "";
  container.style.position = "relative";

  // FINISH SCREEN
  const finishScreen = document.createElement("img");
  finishScreen.src = "assets/goma_kissed_peach.gif";
  finishScreen.id = "finishImg";
  finishScreen.style.display = "none";
  container.appendChild(finishScreen);

  // PUZZLE BOARD
  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 100px)";
  board.style.gridTemplateRows = "repeat(3, 100px)";
  board.style.gap = "5px";
  board.style.position = "relative";
  board.style.margin = "0 auto";
  board.style.userSelect = "none";
  container.appendChild(board);

  // INSTRUCTIONS
  const instructions = document.createElement("div");
  instructions.id = "instructions";
  instructions.classList.add("instructions");
  instructions.innerHTML = `
    <p>🎮 Drag and swap the tiles to rearrange!</p>
    <p>❤️ Solve the puzzle to reveal a hidden message!</p>
  `;
  container.appendChild(instructions);

  // PUZZLE PIECES
  const pieces = [
    "assets/piece_1.png",
    "assets/piece_2.png",
    "assets/piece_3.png",
    "assets/piece_4.png",
    "assets/piece_5.png",
    "assets/piece_6.png",
    "assets/piece_7.png",
    "assets/piece_8.png",
    "assets/piece_9.png",
  ];

  const shuffled = [...pieces].sort(() => Math.random() - 0.5);

  // MOBILE DRAG STATE
  let isDragging = false;
  let draggedTile = null;
  let offsetX = 0;
  let offsetY = 0;

  // COMPLETION CHECK TIMER
  let completionTimer = null;
  function scheduleCompletionCheck() {
    clearTimeout(completionTimer);
    completionTimer = setTimeout(checkCompletion, 800);
  }

  // CREATE TILES
  shuffled.forEach((src) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tile-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.width = "100px";
    wrapper.style.height = "100px";

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.width = "100%";
    tile.style.height = "100%";
    tile.style.borderRadius = "10px";
    tile.style.overflow = "hidden";
    tile.style.position = "relative";
    tile.style.cursor = "grab";
    tile.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    tile.dataset.correctIndex = pieces.indexOf(src);

    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none";
    tile.appendChild(img);

    wrapper.appendChild(tile);
    board.appendChild(wrapper);

    // DESKTOP DRAG
    tile.draggable = true;

    tile.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("src", img.src);
      tile.style.opacity = "0.5";
    });

    tile.addEventListener("dragend", () => {
      tile.style.opacity = "1";
    });

    tile.addEventListener("dragover", (e) => e.preventDefault());

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      const fromSrc = e.dataTransfer.getData("src");
      const toImg = tile.querySelector("img");

      if (fromSrc !== toImg.src) {
        const fromTile = [...board.querySelectorAll(".tile")].find(
          (t) => t.querySelector("img").src === fromSrc,
        );

        if (fromTile) {
          swapTiles(fromTile, tile);
        }
      }

      scheduleCompletionCheck();
    });

    // MOBILE TOUCH DRAG
    tile.addEventListener("touchstart", (e) => {
      e.preventDefault();
      isDragging = true;
      draggedTile = tile;

      const touch = e.touches[0];
      const rect = tile.getBoundingClientRect();

      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      tile.style.position = "fixed";
      tile.style.zIndex = "1000";
      tile.style.width = "100px";
      tile.style.height = "100px";
      tile.style.left = rect.left + "px";
      tile.style.top = rect.top + "px";
      tile.style.opacity = "0.8";
      tile.style.transform = "scale(1.1)";
    });

    tile.addEventListener("touchmove", (e) => {
      if (!isDragging || draggedTile !== tile) return;
      e.preventDefault();

      const touch = e.touches[0];
      tile.style.left = touch.clientX - offsetX + "px";
      tile.style.top = touch.clientY - offsetY + "px";
    });

    tile.addEventListener("touchend", (e) => {
      if (!isDragging || draggedTile !== tile) return;

      tile.style.visibility = "hidden";
      const touch = e.changedTouches[0];
      const elementAtPoint = document.elementFromPoint(
        touch.clientX,
        touch.clientY,
      );
      tile.style.visibility = "visible";

      const targetTile = elementAtPoint?.closest(".tile");

      if (targetTile && targetTile !== tile) {
        swapTiles(tile, targetTile);
      }

      resetTilePosition(tile);
      isDragging = false;
      draggedTile = null;

      scheduleCompletionCheck();
    });
  });

  // SWAP LOGIC
  function swapTiles(tileA, tileB) {
    const imgA = tileA.querySelector("img");
    const imgB = tileB.querySelector("img");

    const tempSrc = imgA.src;
    imgA.src = imgB.src;
    imgB.src = tempSrc;

    const tempIndex = tileA.dataset.correctIndex;
    tileA.dataset.correctIndex = tileB.dataset.correctIndex;
    tileB.dataset.correctIndex = tempIndex;
  }

  // RESET MOBILE TILE POSITION
  function resetTilePosition(tile) {
    tile.style.position = "relative";
    tile.style.zIndex = "";
    tile.style.left = "";
    tile.style.top = "";
    tile.style.width = "100%";
    tile.style.height = "100%";
    tile.style.opacity = "1";
    tile.style.transform = "";
  }

  // COMPLETION CHECK
  function checkCompletion() {
    let correct = 0;

    [...board.children].forEach((wrapper, i) => {
      const tile = wrapper.querySelector(".tile");
      if (tile && parseInt(tile.dataset.correctIndex) === i) correct++;
    });

    if (correct === 9) {
      finishScreen.style.display = "block";
      board.style.display = "none";
      instructions.style.display = "none";

      setTimeout(() => {
        onComplete && onComplete();
      }, 1000);
    }
  }
}
