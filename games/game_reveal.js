export function startRevealGame(onComplete) {
  const container = document.getElementById("game-container");
  container.innerHTML = "";
  container.style.position = "relative";

  // FINISH SCREEN OVERLAY
  const finishScreen = document.createElement("img");
  finishScreen.src = "assets/goma_kissed_peach.gif";
  finishScreen.id = "finishImg";
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

  // Shuffle pieces
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);

  let correctCount = 0;

  shuffled.forEach((src, index) => {
    const tile = document.createElement("div");
    tile.style.width = "100px";
    tile.style.height = "100px";
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
    tile.appendChild(img);

    tile.draggable = true;

    // DRAG EVENTS
    tile.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("index", index);
      tile.style.opacity = "0.5";
    });

    tile.addEventListener("dragend", () => {
      tile.style.opacity = "1";
    });

    tile.addEventListener("dragover", (e) => e.preventDefault());

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      const fromIndex = e.dataTransfer.getData("index");
      const toIndex = index;

      const fromTile = board.children[fromIndex];
      const toTile = board.children[toIndex];

      if (fromTile && toTile && fromTile !== toTile) {
        // Swap the image sources
        const fromImg = fromTile.querySelector("img");
        const toImg = toTile.querySelector("img");
        const tempSrc = fromImg.src;
        fromImg.src = toImg.src;
        toImg.src = tempSrc;

        // Swap the correct indices
        const tempIndex = fromTile.dataset.correctIndex;
        fromTile.dataset.correctIndex = toTile.dataset.correctIndex;
        toTile.dataset.correctIndex = tempIndex;
      }

      checkCompletion();
    });

    board.appendChild(tile);
  });

  // CHECK IF ALL PIECES ARE IN CORRECT ORDER
  function checkCompletion() {
    let correct = 0;

    [...board.children].forEach((tile, i) => {
      if (parseInt(tile.dataset.correctIndex) === i) {
        correct++;
      }
    });

    if (correct === 9) {
      finishScreen.style.display = "block";
      board.style.display = "none";

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }
  }
}
