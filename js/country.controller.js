'use strict'

function onGetCountryInfo() {
    console.log('Hi')
}

function renderInfo(data) {
    console.log('Rendering...')
}

const elGetCountryBtn = document.querySelector('form')

// Add a click event listener
elGetCountryBtn.addEventListener('submit', function (ev) {
    ev.preventDefault()
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
            console.log(country)
            renderCountry(country.data[0])
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
})

function renderCountry(country) {
    console.log(country)
    const { countryName, population, area, neighbors, flag , map} = country
    
    const elCountryName = document.querySelector('.name')
    elCountryName.innerText = `Country name: ${countryName}`

    const elFlag = document.querySelector('.flag')
    elFlag.src = flag

    const elPopulation = document.querySelector('.population')
    elPopulation.innerText = `Population: ${population}`

    const elArea = document.querySelector('.area')
    elArea.innerText = `area: ${area}`

    const elMap = document.querySelector('.map')
    elMap.href = map
    
    let strHtml ='';
    for(let n in neighbors) {
        strHtml += `<a class="neighbors" onclick="onGetCountryByCode('${neighbors[n]}')">${neighbors[n]}</a>`
    }
  

    const elNeighbors = document.querySelector('.neighbors-btn')
    elNeighbors.innerHTML = strHtml

}

function onGetCountryByCode(code){
    hideCountry()
    showLoader()
    

    getCountryByCode(code)
        .then(country => {
            console.log('country', country)
            renderCountry(country.data[0])
            hideLoader()
            showCountry()
            console.log(country)
            renderCountry(country.data[0])
        })
        .catch(err => {
            console.error(`Encountered the following error while fetching data: ${err}`)
        })
   

}

function onClearCache(){
    saveToStorage(STORAGE_KEY, {})
    gCountriesCache = loadFromStorage(STORAGE_KEY) || {}
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