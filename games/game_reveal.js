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

  // 9 PUZZLE PIECES
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

  // Shuffle
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);

  // MOBILE DRAG STATE
  let isDragging = false;
  let draggedTile = null;
  let offsetX = 0;
  let offsetY = 0;

  shuffled.forEach((src) => {
    // 1. CREATE WRAPPER (This stays in the grid layout)
    const wrapper = document.createElement("div");
    wrapper.className = "tile-wrapper";
    wrapper.style.position = "relative"; // Anchor for tile
    wrapper.style.width = "100px";
    wrapper.style.height = "100px";
    wrapper.style.userSelect = "none";

    // 2. CREATE TILE (This is the visual part that moves)
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.width = "100%";
    tile.style.height = "100%";
    tile.style.borderRadius = "10px";
    tile.style.overflow = "hidden";
    tile.style.position = "relative"; // Default state
    tile.style.cursor = "grab";
    tile.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    tile.dataset.correctIndex = pieces.indexOf(src);

    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none"; // Important: prevents img from stealing touch events
    tile.appendChild(img);

    // 3. NEST TILE IN WRAPPER
    wrapper.appendChild(tile);
    board.appendChild(wrapper); // Only append wrapper to board!

    // --- DRAG EVENTS (DESKTOP) ---
    tile.draggable = true;

    tile.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("src", img.src);
      e.dataTransfer.setData("index", tile.dataset.correctIndex);
      tile.style.opacity = "0.5";
    });

    tile.addEventListener("dragend", () => {
      tile.style.opacity = "1";
    });

    tile.addEventListener("dragover", (e) => e.preventDefault());

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      const fromSrc = e.dataTransfer.getData("src");
      const fromIndex = e.dataTransfer.getData("index");
      const toImg = tile.querySelector("img");

      if (fromSrc !== toImg.src) {
        // Find the source tile in the DOM based on the index/src
        const allTiles = [...board.querySelectorAll(".tile")];
        const fromTile = allTiles.find(
          (t) => t.querySelector("img").src === fromSrc,
        );

        if (fromTile) {
          // Swap logic
          const fromImg = fromTile.querySelector("img");
          const tempSrc = fromImg.src;
          fromImg.src = toImg.src;
          toImg.src = tempSrc;

          const tempIndex = fromTile.dataset.correctIndex;
          fromTile.dataset.correctIndex = tile.dataset.correctIndex;
          tile.dataset.correctIndex = tempIndex;
        }
      }
      checkCompletion();
    });

    // --- TOUCH EVENTS (MOBILE) ---
    tile.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Stop scrolling
      isDragging = true;
      draggedTile = tile;

      const touch = e.touches[0];
      const rect = tile.getBoundingClientRect();

      // Calculate offset from the finger to the top-left of the tile
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      // Make tile float above everything using FIXED position
      // The wrapper stays behind to hold the grid space
      tile.style.position = "fixed";
      tile.style.zIndex = "1000";
      tile.style.width = "100px"; // Enforce size while dragging
      tile.style.height = "100px";
      tile.style.left = rect.left + "px"; // Start exactly where it was
      tile.style.top = rect.top + "px";
      tile.style.opacity = "0.8";
      tile.style.transform = "scale(1.1)"; // Slight pop effect
    });

    tile.addEventListener("touchmove", (e) => {
      if (!isDragging || draggedTile !== tile) return;
      e.preventDefault();

      const touch = e.touches[0];
      // Update position based on finger
      tile.style.left = touch.clientX - offsetX + "px";
      tile.style.top = touch.clientY - offsetY + "px";
    });

    tile.addEventListener("touchend", (e) => {
      if (!isDragging || draggedTile !== tile) return;

      // 1. Hide dragged tile momentarily so we can see what's UNDER it
      tile.style.visibility = "hidden";

      const touch = e.changedTouches[0];
      const elementAtPoint = document.elementFromPoint(
        touch.clientX,
        touch.clientY,
      );

      // 2. Show it again immediately
      tile.style.visibility = "visible";

      const targetTile = elementAtPoint?.closest(".tile");

      // 3. Swap if valid target
      if (targetTile && targetTile !== tile) {
        const fromImg = tile.querySelector("img");
        const toImg = targetTile.querySelector("img");

        const tempSrc = fromImg.src;
        fromImg.src = toImg.src;
        toImg.src = tempSrc;

        const tempIndex = tile.dataset.correctIndex;
        tile.dataset.correctIndex = targetTile.dataset.correctIndex;
        targetTile.dataset.correctIndex = tempIndex;
      }

      // 4. Reset Styles (Snap back to wrapper)
      tile.style.position = "relative";
      tile.style.zIndex = "";
      tile.style.left = "";
      tile.style.top = "";
      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.opacity = "1";
      tile.style.transform = "";

      isDragging = false;
      draggedTile = null;
      checkCompletion();
    });
  });

  // UPDATED COMPLETION CHECK (Look inside wrappers)
  function checkCompletion() {
    let correct = 0;
    // Iterate over wrappers (children of board), then find the tile inside
    [...board.children].forEach((wrapper, i) => {
      const tile = wrapper.querySelector(".tile");
      if (tile && parseInt(tile.dataset.correctIndex) === i) correct++;
    });

    if (correct === 9) {
      finishScreen.style.display = "block";
      board.style.display = "none";
      setTimeout(() => {
        onComplete && onComplete();
      }, 800);
    }
  }
}
