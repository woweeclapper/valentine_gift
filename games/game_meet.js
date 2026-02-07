export function startMeetGame(onComplete) {
  const container = document.getElementById("game-container");
  if (!container) {
    console.error("game container not found");
    return;
  }
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(5, 100px)";
  grid.style.gap = "4px";

  // Create hugging image element
  let huggingImg = document.createElement("img");
  huggingImg.id = "huggingImg";
  huggingImg.src = "assets/hugging_cats.gif";
  huggingImg.style.display = "none";
  container.appendChild(huggingImg);

  const cell = document.createElement("div");
  cell.classList.add("cell");

  const goma = document.createElement("img");
  goma.src = "assets/goma.gif";
  goma.classList.add("cell-img");

  cell.appendChild(goma);
  grid.appendChild(cell);

  const peach = document.createElement("img");
  peach.src = "assets/peach.gif";
  peach.classList.add("cell-img");
  cell.appendChild(peach);
  grid.appendChild(cell);

  let posA = 0;
  let posB = 24;
  let isGameOver = false; //prevent multiple alerts

  function render() {
    grid.innerHTML = "";

    // WIN CONDITION CHECK
    if (posA === posB) {
      huggingImg.style.display = "block";

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
      cell.classList.add("cell"); // Ensure this matches your CSS
      cell.dataset.index = i.toString();

      if (i === posA) {
        const goma = document.createElement("img");
        goma.src = "assets/goma.gif"; // creating img fresh avoids moving issues
        goma.classList.add("cell-img");
        cell.appendChild(goma);
      }

      if (i === posB) {
        const peach = document.createElement("img");
        peach.src = "assets/peach.gif";
        peach.classList.add("cell-img");
        cell.appendChild(peach);
      }

      grid.appendChild(cell);
    }
  }

  render();
  container.appendChild(grid);
  function slideCharacters() {
    const distance = Math.abs(posA - posB);
    const direction = posA > posB ? -1 : 1;

    const interval = setInterval(() => {
      if (distance === 0) {
        clearInterval(interval);
        return;
      }

      if (posA !== posB) {
        if (posA > posB) posA -= direction;
        else posA += direction;
      }

      render();
    }, 200); //for smoother sliding
  }

  window.addEventListener("keydown", (e) => {
    if (isGameOver) return; // prevent movement after game over

    if (e.key === "ArrowRight" && posA % 5 !== 4) posA++;
    if (e.key === "ArrowLeft" && posA % 5 !== 0) posA--;
    if (e.key === "ArrowUp" && posA >= 5) posA -= 5;
    if (e.key === "ArrowDown" && posA < 20) posA += 5;

    //if (posA === posB) alert("They met! ❤️");

    render();
  });

  window.addEventListener("click", (e) => {
    if (isGameOver) return; // prevent interaction after game over
    const cell = e.target.closest("div");
    if (cell && Numeber(cell.dataset.index) === posA) {
      posB = Number(cell.dataset.index);
      slideCharacters();
    }
  });

  window.addEventListener("touchstart", (e) => {
    const cell = e.target.closest("div");
    if (cell && Number(cell.dataset.index) === posA) {
      posB = Number(cell.dataset.index);
      slideCharacters();
    }
  });
}
