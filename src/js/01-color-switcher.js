const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};
refs.stop.setAttribute('disabled', 'disabled');
let interval;

refs.start.addEventListener('click', changeBgColor);
refs.stop.addEventListener('click', stopChangeBgColor);

function changeBgColor() {
  if (!interval) {
    refs.stop.removeAttribute('disabled');
    refs.start.setAttribute('disabled', 'disabled');
    interval = setInterval(setBgColor, 800);
  }
}

function setBgColor() {
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function stopChangeBgColor() {
  refs.stop.setAttribute('disabled', 'disabled');
  refs.start.removeAttribute('disabled');
  clearInterval(interval);
  interval = null;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// refs.start.setAttribute('disabled', 'disabled');
// refs.stop.setAttribute('disabled', 'disabled');
