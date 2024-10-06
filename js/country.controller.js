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
            renderCountry(country)
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
})

function renderCountry(country) {

    const elCountryData = document.querySelector('.country-data')
    console.log(country)
    //TODO

    const strHTMLs = `
        country name: ${country[0].countryName}
        population: ${country[0].population}
        area: ${country[0].area}
        neighbors: ${country[0].neighbors}
        flag: ${country[0].flag}`

    elCountryData.innerText = strHTMLs
}

