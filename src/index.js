import menu from './js/fetchCountries'
import debounce from 'lodash.debounce'

import countriesTmp from './templates/countries.hbs'
import countriesListTmp from './templates/countries-list.hbs'

const listRef = document.querySelector('#list')
console.log(listRef)
const inputRef = document.querySelector('.input-text')
inputRef.addEventListener('input', debounce(getCountries, 2000))
function getCountries() {
  let getCountries = e.target.value.toLowerCase().trim()
  console.log(getCountries)
}
