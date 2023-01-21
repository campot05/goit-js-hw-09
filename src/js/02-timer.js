import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
start.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    let chooseDate = new Date(selectedDates[0]);

    if (chooseDate < currentDate) {
      Notify.failure('Please choose a date in the future.');
      start.setAttribute('disabled', 'disabled');
      return;
    } else {
      start.removeAttribute('disabled');
    }
  },
};

function startTimer() {
  let objTime = {};
  let differenceTime = chooseDate - Date.now();
  intervalId = setInterval(() => {
    if (differenceTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    objTime = convertMs(differenceTime);
  });
}

function addLeadingZero(item) {
  return String(item).padStart(2, '0');
}

flatpickr('input[type=text]', options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
