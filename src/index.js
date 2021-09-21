import { fetchCountry } from './js/fetchCountries'
import debounce from 'lodash.debounce'
import { error } from '@pnotify/core'

const item = document.querySelector('.country')
const listRef = document.querySelector('#list')
const inputRef = document.querySelector('.input-text')

inputRef.addEventListener('input', debounce(getCountries, 500))
function getCountries(e) {
  if (e.target.value.length === 0) {
    listRef.innerHTML = ''
    return
  }

  let getCountries = e.target.value.toLowerCase().trim()

  fetchCountry(getCountries).then(data => {
    if (data.status == 404) error({ text: 'Not found.' })
    listRef.innerHTML = ''
    item.innerHTML = ''
    const countries = data
      .splice(-10)
      .map((elem, i, arr) => {
        if (arr.length == 1) {
          return `
          <h2 class="country-title">${elem.name}</h2>
          <ul class="country-list">
            <li class="country-item">
              <span class="title-name">Capital: </span>
              <span class="title-value">${elem.capital}</span>
            </li>
            <li class="country-item">
              <span class="title-name">Population:</span>
              <span class="title-value">${elem.population}</span>
            </li>
            <li class="country-item ">
              <span class="title-name">Language :</span>
              <ul class="language-list">
                  <li class="language-item">${elem.name}</li>
              </ul>
            </li>
          </ul>
          <img class="flag-img" src="${elem.flag}" alt="flag" width="500" height="300">
        `
        } else {
          return `<li>${elem.name}</li>`
        }
      })
      .join('')

    if (data.length == 0) {
      item.insertAdjacentHTML('afterbegin', countries)
    } else listRef.insertAdjacentHTML('afterbegin', countries)

    if (data.length > 10) error({ text: 'Too many matches found.Please enter a more specific query!' })
  })
}
