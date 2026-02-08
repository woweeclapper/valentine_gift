import { startMeetGame } from "./games/game_meet.js";
import { startRevealGame } from "./games/game_reveal.js";
import { startCatchGame } from "./games/game_catch.js";
import { initEnvelopeAnimation } from "./love letter/envelope.js";

const games = [startMeetGame, startRevealGame, startCatchGame];
const chosenGame = startMeetGame; // intentional

window.onload = () => {
  console.log("chosen game:", chosenGame.name);
  chosenGame(showValentinePopup); // pass callback, but DO NOT call popup here
};

function showValentinePopup() {
  const popup = document.getElementById("valentine-popup");
  const yesButton = document.getElementById("yes-btn");
  const noButton = document.getElementById("no-btn");
  const sprite = document.getElementById("sprite");

  popup.style.display = "flex";

  yesButton.onclick = () => {
    popup.style.display = "none";
    alert("Yay! ❤️");
    initEnvelopeAnimation(); // Initialize the envelope animation when "Yes" is clicked
  };

  noButton.onclick = () => {
    sprite.style.opacity = 0;
    const src = sprite.src;
    sprite.src = "";
    sprite.src = src;

    setTimeout(() => {
      sprite.style.opacity = 1;
    }, 50);
  };
}
