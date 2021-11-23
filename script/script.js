const daysWidget = document.querySelector(".days .widget__wrapper");
const hoursWidget = document.querySelector(".hours .widget__wrapper");
const minutesWidget = document.querySelector(".minutes .widget__wrapper");
const secondsWidget = document.querySelector(".seconds .widget__wrapper");

const oneMinute = 60;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
let isTimerStarted = false;

// Defining an edge case as target time to check if all widgets working properly
let targetTime = oneDay * 14;

function timeTrackingObject(value, calc, widget) {
  this.currentValue = value;
  this.calculator = calc;
  this.widget = widget;
  this.refreshValue = () => this.currentValue = this.calculator();
}

const secondsTracker = new timeTrackingObject(calcSeconds(), calcSeconds, secondsWidget);
const minutesTracker = new timeTrackingObject(calcMinutes(), calcMinutes, minutesWidget);
const hoursTracker = new timeTrackingObject(calcHours(), calcHours, hoursWidget);
const daysTracker = new timeTrackingObject(calcDays(), calcDays, daysWidget);
const allTimeTrackers = [secondsTracker, minutesTracker, hoursTracker, daysTracker];

// ----- Calculators -----
function calcSeconds() {
  return targetTime % oneMinute;
}

function calcMinutes() {
  return Math.floor((targetTime % oneHour) / oneMinute);
}

function calcHours() {
  return Math.floor((targetTime % oneDay) / oneHour);
}

function calcDays() {
  return Math.floor(targetTime / oneDay);
}


function updateTimeframe({ currentValue, calculator, widget, refreshValue }) {
  if (!isTimerStarted || currentValue != calculator()) {
    refreshValue();
    updateWidget(widget, calculator());
  }
}

function updateWidget(widget, value) {
  value = twoDigitZeroPaded(value);
  updateRevealingChildren(widget, value);
  animateWidgetAndUpdateHiddenChildren(widget, value);
}

function twoDigitZeroPaded(value) {
  return value.toString().padStart(2, "0");
}

function updateRevealingChildren(widget, value) {
  for (let child of widget.children) {
    if (isRevealingChildren(child))
      child.textContent = value;
  }
}

function isRevealingChildren(child) {
  return child.classList.contains("top-back") ||
    child.classList.contains("bottom-front");
}

function animateWidgetAndUpdateHiddenChildren(widget, value, timeout = 900) {
  widget.classList.add("flip");

  setTimeout(
    () => {
      updateHiddenChildren(widget, value);
      widget.classList.remove("flip");
    }, timeout
  );
}

function updateHiddenChildren(widget, value) {
  for (let child of widget.children) {
    if (!isRevealingChildren(child))
      child.textContent = value;
  }
}

function updateTimer() {
  allTimeTrackers.forEach(tracker => updateTimeframe(tracker));
  isTimerStarted = true;
}

(function countDown() {
  if (targetTime) {
    targetTime--;
    updateTimer();
    setTimeout(() => countDown(), 1000);
  }
})();
