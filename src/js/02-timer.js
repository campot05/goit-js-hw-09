import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.start.disabled = true;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.start.disabled = true;
      Notify.failure('Please choose a date in the future.');
    } else {
      refs.start.disabled = false;
      userDate = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      refs.start.disabled = true;
      const currentTime = Date.now();
      const diffTime = userDate - currentTime;
      const components = convertMs(diffTime);

      refs.days.textContent = addLeadingZero(components.days);
      refs.hours.textContent = addLeadingZero(components.hours);
      refs.minutes.textContent = addLeadingZero(components.minutes);
      refs.seconds.textContent = addLeadingZero(components.seconds);

      if (diffTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}

function addLeadingZero(item) {
  return String(item).padStart(2, '0');
}

flatpickr('input[type=text]', options);

const timer = new Timer();

refs.start.addEventListener('click', () => {
  timer.startTimer();
});

// =======================================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
