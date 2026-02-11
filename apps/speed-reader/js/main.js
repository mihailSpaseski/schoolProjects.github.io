const textInput = document.getElementById("textInput");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const returnHome = document.getElementById("returnHome");
const display = document.getElementById("display");

let words = [];
let currentIndex = 0;
let timeout = null;
let countdownInterval = null;

// STATES: "idle" | "countdown" | "running" | "paused"
let state = "idle";

// Live WPM label
speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;
});

function setButtonLabel() {
  if (state === "running") {
    startBtn.textContent = "Pause";
    textInput.style.display = "none"; // HIDE
  } else if (state === "paused") {
    startBtn.textContent = "Resume";
    textInput.style.display = "block"; // SHOW
  } else {
    startBtn.textContent = "Start";
    textInput.style.display = "block"; // SHOW
  }
}

// Countdown before first start
function startCountdown() {
  state = "countdown";
  setButtonLabel();

  let count = 5;
  display.textContent = count;

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      display.textContent = count;
    } else {
      clearInterval(countdownInterval);
      beginReading();
    }
  }, 1000);
}

function beginReading() {
  if (!words.length) {
    const text = textInput.value.trim();
    if (!text) {
      state = "idle";
      setButtonLabel();
      return;
    }
    words = text.split(/\s+/);
    currentIndex = 0;
  }

  state = "running";
  setButtonLabel();
  readNextWord();
}

// Dynamic-speed loop
function readNextWord() {
  if (state !== "running") return;

  if (currentIndex >= words.length) {
    display.textContent = "Done";
    state = "idle";
    setButtonLabel();
    return;
  }

  display.textContent = words[currentIndex++];
  const delay = 60000 / parseInt(speedSlider.value);
  timeout = setTimeout(readNextWord, delay);
}

// START / PAUSE / RESUME button
startBtn.addEventListener("click", () => {
  if (state === "idle") {
    clearTimeout(timeout);
    clearInterval(countdownInterval);
    words = [];
    startCountdown();
    textInput.style.display = "none";
  } else if (state === "running") {
    state = "paused";
    clearTimeout(timeout);
    setButtonLabel();
  } else if (state === "paused") {
    state = "running";
    setButtonLabel();
    readNextWord();
  }
});

// STOP = stop but keep position
stopBtn.addEventListener("click", () => {
  if (state === "running" || state === "paused") {
    state = "paused";
    clearTimeout(timeout);
    clearInterval(countdownInterval);
    display.textContent = "Stopped";
    setButtonLabel();
  }
});

// RESET = full reset
resetBtn.addEventListener("click", () => {
  state = "idle";
  clearTimeout(timeout);
  clearInterval(countdownInterval);
  currentIndex = 0;
  words = [];
  display.textContent = "Ready";
  setButtonLabel();
});

// Init
setButtonLabel();
