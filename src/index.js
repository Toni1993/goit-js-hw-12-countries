import { fetchCountry } from './js/fetchCountries'
// console.log(fetchCountry)
import debounce from 'lodash.debounce'
import '@pnotify/core/dist/BrightTheme.css'

import { alert, notice, info, success, error } from '@pnotify/core'
// or

// Manually set the type.
const myAlert = alert({
  text: "I'm an alert.",
  type: 'info',
})

// Automatically set the type.
const myNotice = notice({
  text: "I'm a notice.",
})

const myInfo = info({
  text: "I'm an info message.",
})

const mySuccess = success({
  text: "I'm a success message.",
})

const myError = error({
  text: "I'm an error message.",
})

// import countriesTmp from './templates/countries.hbs'
// import countriesListTmp from './templates/countries-list.hbs'

const listRef = document.querySelector('#list')
// console.log(listRef)
const inputRef = document.querySelector('.input-text')

inputRef.addEventListener('input', debounce(getCountries, 500))
function getCountries(e) {
  let getCountries = e.target.value.toLowerCase().trim()

  fetchCountry(getCountries).then(data => {
    listRef.innerHTML = ''
    console.log(data)
    const countries = data
      .splice(-10)
      .map(elem => {
        return `
    <li>
       ${elem.name}
       </li>
     `
      })
      .join('')
    listRef.insertAdjacentHTML('afterbegin', countries)
  })
}
