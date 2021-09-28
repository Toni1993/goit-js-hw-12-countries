const BASE_URL = 'https://restcountries.com/v2/name/'

export function fetchCountry(searchQuery) {
  return fetch(`${BASE_URL}${searchQuery}`).then(response => {
    if (response.ok) return response.json()
    throw new Error('error fetching data')
  })
}
