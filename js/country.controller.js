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
    // alert('Button was clicked!')
    const elCountryName = document.querySelector('.country-name')
    const countryName = elCountryName.value
    console.log(countryName)
    getCountryData(countryName)
        .then(country => {
            renderCountry(country[0])
            console.log(country)
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
})

function renderCountry(country) {
    // console.log(country)
    const { countryName, population, area, neighbors, flag } = country
    console.log(countryName, population, area, neighbors, flag)
    const elCountryName = document.querySelector('.name')
    elCountryName.innerText = `Country name: ${countryName}`

    const elFlag = document.querySelector('.flag')
    elFlag.src = flag

    const elPopulation = document.querySelector('.population')
    elPopulation.innerText = `Population: ${population}`

    const elArea = document.querySelector('.area')
    elArea.innerText = `area: ${area}`

}

