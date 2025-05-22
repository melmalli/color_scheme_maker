"use strict";

const colors = document.querySelectorAll(".color");
const colorContainers = document.querySelectorAll(".color_container");
const rgbContainers = document.querySelectorAll(".rgb_container");
const iconContainers = document.querySelectorAll(".icon_container");
const lockButtons = document.querySelectorAll(".lock");
const changeButtons = document.querySelectorAll(".change");
const displayColorButtons = document.querySelectorAll(".display_color");
const unlockAllButton = document.querySelector("#unlock_all_button");
const showColorsButton = document.querySelector("#show_colors_button");
const hideColorButton = document.querySelector("#hide_color_button");
const shuffleButton = document.querySelector("#shuffle_button");

disableByClass(colorContainers);
disableByClass(lockButtons);
disableByClass(changeButtons);
disableByClass(displayColorButtons);

disableById(unlockAllButton);
disableById(showColorsButton);
disableById(hideColorButton);

// Set color opacity to half
for (let color of colors) {
  color.style.opacity = "0.5";
}

// Hide rgb containers
for (let rgbContainer of rgbContainers) {
  rgbContainer.classList.add("hidden");
}

// Hide icon containers
for (let iconContainer of iconContainers) {
  iconContainer.classList.add("hidden");
}

// When "Shuffle" button clicked
shuffleButton.addEventListener("click", () => {
  enableByClass(colorContainers);
  enableByClass(lockButtons);
  enableByClass(changeButtons);
  enableByClass(displayColorButtons);
  enableById(unlockAllButton);
  enableById(showColorsButton);
  enableById(hideColorButton);

  for (let color of colors) {
    color.style.opacity = "1";
    if (color.classList.contains("unlocked")) {
      color.style.backgroundColor = getColorString();
      color.firstElementChild.textContent = `${color.style.backgroundColor}`;
    }
  }
});

// When "Unlock All" button clicked
unlockAllButton.addEventListener("click", () => {
  for (let lockButton of lockButtons) {
    lockButton.classList.remove("lock_icon_clicked");
  }
  for (let colorContainer of colorContainers) {
    colorContainer.firstElementChild.classList.add("unlocked");
  }
});

// When "Show All Color Values" button clicked
showColorsButton.addEventListener("click", () => {
  for (let rgbContainer of rgbContainers) {
    rgbContainer.classList.remove("hidden");
  }
});

// When "Hide Color Values" button clicked
hideColorButton.addEventListener("click", () => {
  for (let rgbContainer of rgbContainers) {
    rgbContainer.classList.add("hidden");
  }
});

// When lock button clicked
for (let lockButton of lockButtons) {
  lockButton.addEventListener("click", (e) => {
    let color = e.target.parentElement.previousElementSibling;
    color.classList.toggle("unlocked");
    lockButton.classList.toggle("lock_icon_clicked");
  });
}

// When change button clicked
for (let changeButton of changeButtons) {
  changeButton.addEventListener("click", (e) => {
    let color = e.target.parentElement.previousElementSibling;
    color.style.opacity = "1";
    color.style.backgroundColor = getColorString();
    color.lastElementChild.textContent = `${color.style.backgroundColor}`;
  });
}

// When display color button clicked
for (let displayColorButton of displayColorButtons) {
  displayColorButton.addEventListener("click", (e) => {
    e.target.parentElement.previousElementSibling.lastElementChild.classList.toggle(
      "hidden"
    );
  });
}

// When hovering over a color
for (let colorContainer of colorContainers) {
  colorContainer.addEventListener("mouseover", () => {
    colorContainer.style.transform = "scale(1.02)";
    colorContainer.classList.add("front");
    colorContainer.lastElementChild.classList.remove("hidden");
  });
  colorContainer.addEventListener("mouseout", () => {
    colorContainer.style.transform = "scale(1)";
    colorContainer.classList.remove("front");
    colorContainer.lastElementChild.classList.add("hidden");
  });
}

// Functions
function getColorString() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function disableByClass(el) {
  for (let x of el) {
    x.classList.add("disabled");
  }
}

function disableById(el) {
  el.classList.add("disabled");
}

function enableByClass(el) {
  for (let x of el) {
    x.classList.remove("disabled");
  }
}

function enableById(el) {
  el.classList.remove("disabled");
}
