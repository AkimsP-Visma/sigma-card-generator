// Generate sample cards on page load
function generateSampleCards() {
  const sampleWords = ["SIGMA", "CARD", "GENERATOR ™", "ALL", "RIGHTS", "RESERVED", "COPYRIGHT ©", "2025", "AKIMS"];
  generateCards(sampleWords);
}

function submit() {
  const container = document.getElementById("cards");
  container.innerHTML = ""; // clear previous cards (including sample cards)

  const words = document
    .getElementById("wordInput")
    .value.split(/\r?\n/)
    .map((w) => w.trim().replace(/^\d+\.?\s*/, "")) // strip leading numbers + optional dot + space
    .filter(Boolean)
    .map((w) => w.toUpperCase()); // convert to uppercase

  if (words.length === 0) {
    alert("Please enter at least one word.");
    return;
  }
  generateCards(words);

  // Remove input area after generation
  document.getElementById("inputArea").remove();
}

function generateCards(words) {
  const container = document.getElementById("cards");
  container.innerHTML = ""; // clear previous cards (including sample cards)

  words.forEach((word) => {
    const card = document.createElement("div");
    card.className = "card";

    const primary = document.createElement("div");
    primary.className = "word secondary";
    const primaryText = document.createElement("div");
    primaryText.className = "text";
    primaryText.textContent = word;
    primary.appendChild(primaryText);

    const secondary = document.createElement("div");
    secondary.className = "word primary";
    const secondaryText = document.createElement("div");
    secondaryText.className = "text";
    secondaryText.textContent = word;
    secondary.appendChild(secondaryText);

    card.appendChild(primary);
    card.appendChild(secondary);
    container.appendChild(card);
  });

  // Check and adjust text widths after all cards are rendered
  setTimeout(() => {
    adjustTextWidths();
  }, 0);
}

function adjustTextWidths() {
  document.querySelectorAll('.word .text').forEach(textElement => {
    const wordElement = textElement.parentElement;
    const textWidth = textElement.scrollWidth;
    const wordWidth = wordElement.clientWidth - (parseFloat(getComputedStyle(wordElement).paddingLeft) + parseFloat(getComputedStyle(wordElement).paddingRight));
    
    if (textWidth > wordWidth) {
      const scaleCoeff = wordWidth / textWidth;
      const isRotated = wordElement.classList.contains('secondary');
      
      if (isRotated) {
        textElement.style.transform = `rotate(180deg) scaleX(${scaleCoeff})`;
      } else {
        textElement.style.transform = `scaleX(${scaleCoeff})`;
      }
      textElement.style.transformOrigin = 'center';
    }
  });
}

function toggleInnerBorders() {
  const container = document.getElementById("cards");
  container.classList.toggle("inner-borders");

  // If inner borders are enabled, adjust the text widths again
  if (container.classList.contains("inner-borders")) {
    adjustTextWidths();
  }
}

function toggleCardBackground() {
  const container = document.getElementById("cards");
  container.classList.toggle("card-background");
}

// Load sample cards when page loads
window.addEventListener('DOMContentLoaded', generateSampleCards);
