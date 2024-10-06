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
    hideCountry()
    showLoader()
    const elCountryName = document.querySelector('.country-name')
    const countryName = elCountryName.value

    getCountryByName(countryName)
        .then(country => {
            console.log('country', country);
            renderCountry(country.data[0])
            hideLoader()
            showCountry()
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
})

function renderCountry(country) {
    
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

function showLoader(){
    const elLoader = document.querySelector('.loader')
    elLoader.classList.remove('hidden')
}

function hideLoader(){
    const elLoader = document.querySelector('.loader')
    elLoader.classList.add('hidden')
}

function showCountry(){
    const elCountry = document.querySelector('.country-info')
    elCountry.classList.remove('hidden')
}

function hideCountry(){
    const elCountry = document.querySelector('.country-info')
    elCountry.classList.add('hidden')
}
