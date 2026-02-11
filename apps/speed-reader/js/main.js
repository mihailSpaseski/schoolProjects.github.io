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

let state = "idle";

speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;
});

function setButtonLabel() {
  if (state === "running") {
    startBtn.textContent = translations[currentLang].pause;
    textInput.style.display = "none"; 
  } else if (state === "paused") {
    startBtn.textContent = translations[currentLang].resume;
    textInput.style.display = "block"; 
  } else {
    startBtn.textContent = translations[currentLang].start;
    textInput.style.display = "block"; 
  }
}

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

function readNextWord() {
  if (state !== "running") return;

  if (currentIndex >= words.length) {
    display.textContent = translations[currentLang].done;
    state = "idle";
    setButtonLabel();
    return;
  }

  display.textContent = words[currentIndex++];
  const delay = 60000 / parseInt(speedSlider.value);
  timeout = setTimeout(readNextWord, delay);
}

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

stopBtn.addEventListener("click", () => {
  if (state === "running" || state === "paused") {
    state = "paused";
    clearTimeout(timeout);
    clearInterval(countdownInterval);
    display.textContent = translations[currentLang].stop;
    setButtonLabel();
  }
});

resetBtn.addEventListener("click", () => {
  state = "idle";
  clearTimeout(timeout);
  clearInterval(countdownInterval);
  currentIndex = 0;
  words = [];
  display.textContent = translations[currentLang].ready;
  setButtonLabel();
});

setButtonLabel();
