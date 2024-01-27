var mainWeatherEl = document.querySelector('#main-weather');
var searchButtonEl = document.querySelector('#search-button');
var searchInputVal = document.querySelector('#search-input').value;

function geocodeApi(searchInput) {
    var geocodeBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    var cityName = searchInputVal;
    var apiKey = '&appiid=544a677c24a40aec4562a9114d5e303c'
    var geocodeQueryUrl = geocodeBaseUrl + cityName + 

}

function citySearch() {
    if (!searchInputVal){
        mainWeatherEl.textContent = 'Please enter a city value';
        console.log('Error');
        return
    }

    var locationString
    var queryString

    geocodeApi()

}

searchButtonEl.addEventListener('click', citySearch);