// envelope.js
export function initEnvelopeAnimation() {
  const envelope = document.getElementById("envelope");
  const btnOpen = document.getElementById("open");
  const btnReset = document.getElementById("reset");
  const resetContainer = document.querySelector(".reset");

  // Show the reset button container when envelope is initialized
  if (resetContainer) {
    resetContainer.style.display = "block";
  }

  function openEnvelope() {
    envelope.classList.add("open");
    envelope.classList.remove("close");
  }

  function closeEnvelope() {
    envelope.classList.add("close");
    envelope.classList.remove("open");
  }

  envelope.addEventListener("click", openEnvelope);
  btnOpen.addEventListener("click", openEnvelope);
  btnReset.addEventListener("click", closeEnvelope);
}
