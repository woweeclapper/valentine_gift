// envelope.js
export function initEnvelopeAnimation() {
  document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.getElementById("envelope");
    const btnOpen = document.getElementById("open");
    const btnReset = document.getElementById("reset");

    //btnReset.style.display = "block"; // Hide reset button initially

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
  });
}
