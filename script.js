let is24HourFormat = false;
let currentHourFormat = 12;

// Format toggle
document.getElementById('format-switch').addEventListener('change', (e) => {
  is24HourFormat = e.target.checked;
  currentHourFormat = is24HourFormat ? 24 : 12;
  document.getElementById('format-label').textContent = is24HourFormat ? '24h' : '12h';
  updateClock(); // force update
});

// Time update logic
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const ampm = h >= 12 ? "PM" : "AM";
  if (!is24HourFormat) h = h % 12 || 12;

  const digits = {
    hourTens: Math.floor(h / 10),
    hourOnes: h % 10,
    minuteTens: Math.floor(m / 10),
    minuteOnes: m % 10,
    secondTens: Math.floor(s / 10),
    secondOnes: s % 10
  };

  flipTo("hour-tens", digits.hourTens);
  flipTo("hour-ones", digits.hourOnes);
  flipTo("minute-tens", digits.minuteTens);
  flipTo("minute-ones", digits.minuteOnes);
  flipTo("second-tens", digits.secondTens);
  flipTo("second-ones", digits.secondOnes);

  document.getElementById("am-pm").textContent = is24HourFormat ? "" : ampm;
}

// Flip animation
function flipTo(id, newNumber) {
  const flipper = document.getElementById(id);
  const front = flipper.querySelector(".front");
  const back = flipper.querySelector(".back");

  if (front.textContent !== String(newNumber)) {
    back.textContent = newNumber;
    flipper.classList.add("flip");
    setTimeout(() => {
      front.textContent = newNumber;
      flipper.classList.remove("flip");
    }, 500);
  }
}

// Navigate to Pomodoro page
function openPomodoroPage() {
  window.location.href = "pomodoro.html";
}

// Initialize clock updates
setInterval(updateClock, 1000);
updateClock(); // initial call

// Toggle fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Toggle dark mode on body
let darkMode = false;
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
}
