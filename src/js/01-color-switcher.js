const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};
refs.stop.setAttribute('disabled', 'disabled');
let interval;

refs.start.addEventListener('click', changeColor);
refs.stop.addEventListener('click', stopChangeColor);

function changeColor() {
  if (!interval) {
    refs.start.setAttribute('disabled', 'disabled');
    refs.stop.removeAttribute('disabled');
    interval = setInterval(() => {
      refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 700);
  }
}

function stopChangeColor() {
  clearInterval(interval);
  interval = null;
  refs.stop.setAttribute('disabled', 'disabled');
  refs.start.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//  ======================== variant 2 ===============================

// const refs = {
//   start: document.querySelector('[data-start]'),
//   stop: document.querySelector('[data-stop]'),
//   body: document.body,
// };

// refs.stop.setAttribute('disabled', 'disabled');
// let interval;

// refs.start.addEventListener('click', changeBgColor);
// refs.stop.addEventListener('click', stopChangeBgColor);

// function changeBgColor() {
//   if (!interval) {
//     refs.stop.removeAttribute('disabled');
//     refs.start.setAttribute('disabled', 'disabled');
//     interval = setInterval(setBgColor, 800);
//   }
// }

// function setBgColor() {
//   refs.body.style.backgroundColor = `${getRandomHexColor()}`;
// }

// function stopChangeBgColor() {
//   refs.stop.setAttribute('disabled', 'disabled');
//   refs.start.removeAttribute('disabled');
//   clearInterval(interval);
//   interval = null;
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// refs.start.setAttribute('disabled', 'disabled');
// refs.stop.setAttribute('disabled', 'disabled');

// ===================================================================================================================
