'use strict'

const STORAGE_KEY = 'countryData'
const CACHE_TIMEOUT = 1_000_000_000
let gCountriesCache = loadFromStorage(STORAGE_KEY) || {}


function getCountryData(countryName) {

    if (gCountriesCache[countryName]) return Promise.resolve(gCountriesCache[countryName].data)

    return axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => {
            const countryData = res.data

            gCountriesCache[countryName] = {
                ts: Date.now(),
                data: getCountry(countryData),
            }
            saveToStorage('countryData', gCountriesCache)
            return gCountriesCache[countryName].data
        })
}

function getCountry(country) {

    const data = country.map(country => {
        return {
            countryName: country.name.common,
            population: country.population,
            area: country.area,
            neighbors: country.borders,
            flag: country.flags.png
        }
    })
    return data
}