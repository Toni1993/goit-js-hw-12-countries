import { fetchCountry } from './js/fetchCountries'
import debounce from 'lodash.debounce'
import { error } from '@pnotify/core'

import country from './templates/country.hbs'
import countriesList from './templates/countriesList.hbs'
const item = document.querySelector('.country')

const listRef = document.querySelector('#list')
const inputRef = document.querySelector('.input-text')

inputRef.addEventListener('input', debounce(getCountries, 500))
function getCountries(e) {
  let getCountries = e.target.value.toLowerCase().trim()

  fetchCountry(getCountries)
    .then(data => {
      listRef.innerHTML = ''
      item.innerHTML = ''
      if (getCountries.length < 1) return
      if (data.length > 1 && data.length <= 10) {
        return (listRef.innerHTML = countriesList(data))
      }
      if (data.length === 1) {
        return (item.innerHTML = country(data))
      }

      if (data.status == 404) error({ text: 'Not found.' })
      if (data.length > 10) error({ text: 'Too many matches found.Please enter a more specific query!' })
    })
    .catch(err => {
      console.error('Error: ', err)
    })
}
