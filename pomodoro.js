let pomodoroInterval;
let isPomodoroRunning = false;
let isPomodoroPaused = false;

let focusTime = 25 * 60; // seconds
let breakTime = 5 * 60;  // seconds
let cycles = 4;
let currentCycle = 0;

let timeLeft = focusTime;
let onBreak = false;

// Start the Pomodoro timer
function startPomodoro() {
  if (isPomodoroRunning) return; // prevent multiple starts
  isPomodoroRunning = true;
  isPomodoroPaused = false;
  currentCycle = 0;
  onBreak = false;
  timeLeft = focusTime;

  updateTimerDisplay();
  document.getElementById("timer-status").textContent = "Focus Time";

  pomodoroInterval = setInterval(timerTick, 1000);
  document.getElementById("pause-btn").textContent = "Pause";
}

// Timer tick every second
function timerTick() {
  if (timeLeft <= 0) {
    if (!onBreak) {
      // Finished focus, start break
      onBreak = true;
      timeLeft = breakTime;
      document.getElementById("timer-status").textContent = "Break Time";
    } else {
      // Finished break, cycle complete
      currentCycle++;
      document.getElementById("cycle-display").textContent = `${currentCycle}/${cycles} Cycles`;

      if (currentCycle >= cycles) {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        document.getElementById("timer-status").textContent = "Completed!";
        playAlarm();
        return;
      }
      // Start next focus period
      onBreak = false;
      timeLeft = focusTime;
      document.getElementById("timer-status").textContent = "Focus Time";
    }
  }

  updateTimerDisplay();
  timeLeft--;
}

// Update timer display (minutes and seconds)
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  setFlipValue("pomo-minute-tens", Math.floor(minutes / 10));
  setFlipValue("pomo-minute-ones", minutes % 10);
  setFlipValue("pomo-second-tens", Math.floor(seconds / 10));
  setFlipValue("pomo-second-ones", seconds % 10);
}

// Flip animation for Pomodoro digits
function setFlipValue(id, number) {
  const flipper = document.getElementById(id);
  const front = flipper.querySelector(".front");
  const back = flipper.querySelector(".back");

  if (front.textContent !== String(number)) {
    back.textContent = number;
    flipper.classList.add("flip");
    setTimeout(() => {
      front.textContent = number;
      flipper.classList.remove("flip");
    }, 500);
  }
}

// Pause or Resume Pomodoro
function pauseResumePomodoro() {
  if (!isPomodoroRunning) return; // no timer running

  if (isPomodoroPaused) {
    pomodoroInterval = setInterval(timerTick, 1000);
    document.getElementById("pause-btn").textContent = "Pause";
  } else {
    clearInterval(pomodoroInterval);
    document.getElementById("pause-btn").textContent = "Resume";
  }
  isPomodoroPaused = !isPomodoroPaused;
}

// Reset Pomodoro
function resetPomodoro() {
  clearInterval(pomodoroInterval);
  isPomodoroRunning = false;
  isPomodoroPaused = false;
  currentCycle = 0;
  onBreak = false;
  timeLeft = focusTime;
  updateTimerDisplay();
  document.getElementById("timer-status").textContent = "Ready";
  document.getElementById("cycle-display").textContent = `0/${cycles} Cycles`;
  document.getElementById("pause-btn").textContent = "Pause";
}

// Alarm sound play
function playAlarm() {
  const alarm = document.getElementById("alarm-sound");
  alarm.play();
}

// Modal controls (optional, keep your existing modal code)
function openCustomTimerModal() {
  document.getElementById("custom-timer-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("custom-timer-modal").style.display = "none";
}

function saveCustomTimer() {
  const focusInput = document.getElementById("focus-time");
  const breakInput = document.getElementById("break-time");
  const cyclesInput = document.getElementById("cycles");

  focusTime = parseInt(focusInput.value) * 60;
  breakTime = parseInt(breakInput.value) * 60;
  cycles = parseInt(cyclesInput.value);

  resetPomodoro();
  closeModal();
  startPomodoro();
}

function backToMainPage() {
  window.location.href = "index.html"; // Or your clock page filename
}


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
