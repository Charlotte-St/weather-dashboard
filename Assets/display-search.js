var mainContentEl = document.getElementById('main-weather');
var latCurrentVal;
var lonCurrentVal;
var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';

mainContentEl.textContent = 'Weather Forecast';

function getParams() {
    var searchParamsArr = document.location.search.split('&');

    var lat = searchParamsArr[0].split('=').pop();
    var lon = searchParamsArr[1].split('=').pop();
    latCurrentVal = lat;
    lonCurrentVal = lon;
    console.log(lat);
    console.log(lon);
}

getParams();

// Clear lat and lon on new search
function clearVals() {
    latCurrentVal = '';
    lonCurrentVal = '';
};

//clearVals();

//Get current weather data from API
function searchCurrentApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + apiKey;
    console.log(currentQueryUrl)
}

searchCurrentApi(latCurrentVal, lonCurrentVal);

//Write current weather to page

//Get 5 day forecast from API

// Write 5 day forecast to page

//Add current city to local Storage

//Add buttons for cities in local storage to side bar

// new search from side bar