import { startMeetGame } from "./games/game_meet.js";
import { startRevealGame } from "./games/game_reveal.js";
import { startCatchGame } from "./games/game_catch.js";

const games = [startMeetGame, startRevealGame, startCatchGame];
const chosenGame = startMeetGame; //games[Math.floor(Math.random() * games.length)];

window.onload = () => {
  console.log("chosen game: ", chosenGame.name);
  chosenGame(showValentinePopup);
};

function showValentinePopup() {
  const popup = document.getElementById("valentine-popup");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const sprite = document.getElementById("sprite");

  popup.style.display = "flex";

  yesBtn.onclick = () => {
    popup.style.display = "none";
    alert("Yay! ❤️");
  };

  noBtn.onclick = () => {
    // Restart GIF
    sprite.style.opacity = 0;
    const src = sprite.src;
    sprite.src = "";
    sprite.src = src;

    setTimeout(() => {
      sprite.style.opacity = 1;
    }, 50);
  };
}
