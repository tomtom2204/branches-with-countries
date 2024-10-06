'use strict'

const STORAGE_KEY = 'countryData'
const CACHE_TIMEOUT = 1_000_000_000
let gCountriesCache = loadFromStorage(STORAGE_KEY) || {}


function getCountryByName(name) {

    if (gCountriesCache[name]) return Promise.resolve(gCountriesCache[name].data)

    return axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => {
            const countryData = res.data

            gCountriesCache[name] = {
                ts: Date.now(),
                data: getCountry(countryData),
            }
            console.log('test: ', gCountriesCache[name].data)
            saveToStorage('countryData', gCountriesCache)
            return gCountriesCache[name].data
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