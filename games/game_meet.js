export function startMeetGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(5, 60px)";
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

  function render() {
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement("div");
      cell.style.width = "60px";
      cell.style.height = "60px";
      cell.style.background = "#ffe6ea";
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      cell.dataset.index = i.toString();

      if (i === posA) cell.textContent = goma.style.display = "none";
      if (i === posB) cell.textContent = peach.style.display = "none";
      if (posA === posB) {
        huggingImg.style.display = "block";
        return;
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

      if (posA > posB) {
        posA -= direction;
      } else {
        posA += direction;
      }

      render();
      distance -= direction;
    }, 50);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && posA % 5 !== 4) posA++;
    if (e.key === "ArrowLeft" && posA % 5 !== 0) posA--;
    if (e.key === "ArrowUp" && posA >= 5) posA -= 5;
    if (e.key === "ArrowDown" && posA < 20) posA += 5;

    if (posA === posB) alert("They met! ❤️");

    render();
  });

  window.addEventListener("click", (e) => {
    const cell = e.target.closest("div");
    if (cell && cell.textContent === goma.src) {
      posB = Number(cell.dataset.index);
      slideCharacters();
    }
  });

  window.addEventListener("touchstart", (e) => {
    const cell = e.target.closest("div");
    if (cell && cell.textContent === goma.src) {
      posB = Number(cell.dataset.index);
      slideCharacters();
    }
  });
}
