import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  button: document.querySelector('[type=submit]'),
};

refs.form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  let firstDelay = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(success => {
        Notify.success(success);
      })
      .catch(error => {
        Notify.failure(error);
      });
    firstDelay += delayStep;
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
