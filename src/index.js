import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import { createMarkup, createPrewiewMarkup } from './markup';

const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
let inputValue = '';

function vizualPrewiewMarkup(data) {
  const markup = data.map(createPrewiewMarkup).join('');
  refs.countriesWraper.innerHTML = markup;
}

function vizualCountryMarkup(data) {
  const markup = data.map(createMarkup).join('');
  refs.countriesInfo.innerHTML = markup;
}

function onInput(event) {
  refs.countriesWraper.innerHTML = '';
  refs.countriesInfo.innerHTML = '';

  inputValue = event.target.value.trim().toLowerCase();
  console.log(inputValue);
  if (!inputValue) {
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length === 1) {
        vizualCountryMarkup(data);
      } else if (data.length >= 2 && data.length <= 10) {
        vizualPrewiewMarkup(data);
      } else {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      console.log('catch');
      console.log(error.message);
      return Notify.failure('Oops, there is no country with that name');
    });
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
