const daysWidget = document.querySelector(".days .widget__wrapper");
const hoursWidget = document.querySelector(".hours .widget__wrapper");
const minutesWidet = document.querySelector(".minutes .widget__wrapper");
const secondsWidget = document.querySelector(".seconds .widget__wrapper");
const monthInSeconds = 30 * 24 * 60 * 60;

let targetTime = Math.round(Math.random() * monthInSeconds); //?
let seconds = calcSeconds();
let minutes = calcMinutes();
let hours = calcHours();
let days = calcDays();
let started = false;

function calcSeconds() {
  return targetTime % 60;
}

function calcMinutes() {
  return Math.floor((targetTime % (60 * 60)) / 60);
}

function calcHours() {
  return Math.floor((targetTime % (24 * 60 * 60)) / 3600);
}

function calcDays() {
  return Math.floor(targetTime / (24 * 60 * 60));
}

function countDown() {
  if (targetTime) {
    targetTime--;
    updateTimer();
    setTimeout(() => {
      countDown();
    }, 1000);
  }
}

function updateSeconds() {
  let last = seconds;
  seconds = calcSeconds();
  if (!started || last != seconds) updateWidget(secondsWidget, last, seconds);
}

function updateMinutes() {
  let last = minutes;
  minutes = calcMinutes();
  if (!started || last != minutes) updateWidget(minutesWidet, last, minutes);
}

function updateHours() {
  let last = hours;
  hours = calcHours();
  if (!started || last != hours) updateWidget(hoursWidget, last, hours);
}

function updateDays() {
  let last = days;
  days = calcDays();
  if (!started || last != days) updateWidget(daysWidget, last, days);
}

function updateWidget(widget, lastValue, currentValue) {
  lastValue = lastValue.toString().padStart(2, "0");
  currentValue = currentValue.toString().padStart(2, "0");
  let queue = [];

  for (let child of widget.children) {
    if (
      child.classList.contains("top-back") ||
      child.classList.contains("bottom-front")
    ) {
      child.textContent = currentValue;
    } else {
      queue.push(child);
    }
  }
  widget.classList.add("flip");
  setTimeout(
    (widget) => {
      queue.forEach((child) => (child.textContent = currentValue));
      widget.classList.remove("flip");
    },
    900,
    widget,
    queue
  );
}

function updateTimer() {
  updateSeconds();
  updateMinutes();
  updateHours();
  updateDays();
  started = true;
}

countDown();
