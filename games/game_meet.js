export function startMeetGame(onComplete) {
  const container = document.getElementById("game-container");
  if (!container) {
    console.error("game container not found");
    return;
  }
  container.innerHTML = "";

  //create a grid of 5 columns?
  const grid = document.createElement("div");
  grid.id = "grid";
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(5, 70px)";
  grid.style.gap = "4px";

  // Create hugging finish screen image element
  let huggingImg = document.createElement("img");
  huggingImg.id = "finishImg";
  huggingImg.src = "assets/hugging_cats.gif";
  huggingImg.style.display = "none";
  container.appendChild(huggingImg);

  const cell = document.createElement("div");
  cell.classList.add("cell");

  const goma = document.createElement("img");
  goma.src = "assets/goma_sad.gif";
  goma.classList.add("cell-img");

  cell.appendChild(goma);
  grid.appendChild(cell);

  const peach = document.createElement("img");
  peach.src = "assets/peach_sad.gif";
  peach.classList.add("cell-img");
  cell.appendChild(peach);
  grid.appendChild(cell);

  let posA = 0;
  let posB = 24;
  let isGameOver = false; //prevent multiple alerts
  let obstacles = []; // Array to store obstacle positions

  //create instructions
  const instructions = document.createElement("div");
  instructions.id = "instructions";
  instructions.classList.add("instructions");
  instructions.innerHTML = `
    <p>🎮 Use arrow keys or tap adjacent cells to move Goma!</p>
    <p>❤️ Guide him to his Peach! Good Luck! </p>
  `;
  container.appendChild(instructions);

  // Maze generation function - ensures valid path from 0 to 24
  function generateMaze() {
    obstacles = [];
    const totalCells = 25;
    const obstacleCount = Math.floor(Math.random() * 12) + 5; // Number of obstacles to place

    // Generate random obstacles, avoiding start (0) and end (24) positions
    while (obstacles.length < obstacleCount) {
      const randomPos = Math.floor(Math.random() * totalCells);
      if (
        randomPos !== 0 &&
        randomPos !== 24 &&
        !obstacles.includes(randomPos)
      ) {
        // Check if adding this obstacle would block all paths
        const testObstacles = [...obstacles, randomPos];
        if (hasValidPath(testObstacles, 0, 24)) {
          obstacles.push(randomPos);
        }
      }
    }
  }

  // BFS pathfinding to ensure there's always a valid path
  function hasValidPath(obstacleList, start, end) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      if (current === end) return true;

      // Get adjacent cells
      const adjacent = [
        current - 1, // left
        current + 1, // right
        current - 5, // up
        current + 5, // down
      ];

      for (const next of adjacent) {
        // Check bounds and obstacles
        if (next < 0 || next >= 25) continue;
        if (obstacleList.includes(next)) continue;
        if (visited.has(next)) continue;

        // Check if moving horizontally stays in same row
        if (
          Math.abs(next - current) === 1 &&
          Math.floor(next / 5) !== Math.floor(current / 5)
        )
          continue;

        visited.add(next);
        queue.push(next);
      }
    }
    return false;
  }

  // Generate maze on game start
  generateMaze();

  function render() {
    grid.innerHTML = "";

    // WIN CONDITION CHECK
    if (posA === posB) {
      huggingImg.style.display = "block";
      instructions.style.display = "none";

      // 3. If game just finished, wait 1.5s then show popup
      if (!isGameOver) {
        isGameOver = true;
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
      return; // Stop rendering the grid
    }

    for (let i = 0; i < 25; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell"); // Ensure this matches CSS
      cell.dataset.index = i.toString();

      if (i === posA) {
        const goma = document.createElement("img");
        goma.src = "assets/goma_sad.gif"; // creating img fresh avoids moving issues
        goma.classList.add("cell-img");
        cell.appendChild(goma);
      }

      if (i === posB) {
        const peach = document.createElement("img");
        peach.src = "assets/peach_sad.gif";
        peach.classList.add("cell-img");
        cell.appendChild(peach);
      }

      // Add obstacles
      if (obstacles.includes(i)) {
        cell.classList.add("obstacle");
      }

      grid.appendChild(cell);
    }
  }

  render();
  container.appendChild(grid);

  // KEYBOARD CONTROL
  window.addEventListener("keydown", (e) => {
    if (isGameOver) return; // prevent movement after game over

    let newPos = posA;
    if (e.key === "ArrowRight" && posA % 5 !== 4) newPos = posA + 1;
    if (e.key === "ArrowLeft" && posA % 5 !== 0) newPos = posA - 1;
    if (e.key === "ArrowUp" && posA >= 5) newPos = posA - 5;
    if (e.key === "ArrowDown" && posA < 20) newPos = posA + 5;

    // Check if new position is not an obstacle
    if (!obstacles.includes(newPos)) {
      posA = newPos;
    }

    render();
  });

  // Function for tap/click - moves goma one step without sliding
  function moveGomaOneStep(index) {
    if (isGameOver) return;

    // Check if cell is an obstacle
    if (obstacles.includes(index)) return;

    // Check if tapped cell is adjacent to posA (goma's position)
    const isAdjacent =
      (index === posA - 1 && posA % 5 !== 0) || // left
      (index === posA + 1 && posA % 5 !== 4) || // right
      index === posA - 5 || // up
      index === posA + 5; // down

    if (isAdjacent) {
      // Move goma one step immediately (no sliding animation)
      posA = index;
      render();
    }
  }

  window.addEventListener("click", (e) => {
    if (isGameOver) return;
    const cell = e.target.closest(".cell");
    if (!cell) return;

    const clickedIndex = Number(cell.dataset.index);
    moveGomaOneStep(clickedIndex);
  });

  window.addEventListener(
    "touchstart",
    (e) => {
      if (isGameOver) return;
      e.preventDefault(); // Prevent scrolling/zooming on mobile
      const cell = e.target.closest(".cell");
      if (!cell) return;

      const touchedIndex = Number(cell.dataset.index);
      moveGomaOneStep(touchedIndex);
    },
    { passive: false },
  );
}
