'use strict'

const STORAGE_KEY = 'countryData'
const CACHE_TIMEOUT = 1_000_000_000
let gCountriesCache = loadFromStorage(STORAGE_KEY) || {}


function getCountryByName(name) {

    if (gCountriesCache[name]) return Promise.resolve(gCountriesCache[name])

    return axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => {
            const countryData = res.data

            gCountriesCache[name] = {
                ts: Date.now(),
                data: getCountry(countryData),
            }
            return gCountriesCache
        }).then(gCountriesCache => {
            saveToStorage(STORAGE_KEY, gCountriesCache)
            return gCountriesCache[name]
            
        }
        )
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