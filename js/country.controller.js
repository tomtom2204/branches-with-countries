'use strict'

function onGetCountryInfo() {
    console.log('Hi')
}

function renderInfo(data) {
    console.log('Rendering...')
}

const elGetCountryBtn = document.querySelector('.get-country')

// Add a click event listener
elGetCountryBtn.addEventListener('click', function () {

    const elCountryName = document.querySelector('.country-name')
    const countryName = elCountryName.value

    getCountryByName(countryName)
        .then(country => {
            console.log(country)
            renderCountry(country.data[0])
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
})

function renderCountry(country) {
    console.log(country)
    const { countryName, population, area, neighbors, flag } = country
    
    const elCountryName = document.querySelector('.name')
    elCountryName.innerText = `Country name: ${countryName}`

    const elFlag = document.querySelector('.flag')
    elFlag.src = flag

    const elPopulation = document.querySelector('.population')
    elPopulation.innerText = `Population: ${population}`

    const elArea = document.querySelector('.area')
    elArea.innerText = `area: ${area}`

}

function onClearCache(){
    saveToStorage(STORAGE_KEY, {})
    gCountriesCache = loadFromStorage(STORAGE_KEY) || {}
}

