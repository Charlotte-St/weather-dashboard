var mainContentEl = document.getElementById('main-weather');
var latCurrentVal;
var lonCurrentVal;
var cityCurrentVal;
var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
var currentWeather; 

//mainContentEl.textContent = 'Weather Forecast';

function getParams() {
    var searchParamsArr = document.location.search.split('&');

    var lat = searchParamsArr[0].split('=').pop();
    var lon = searchParamsArr[1].split('=').pop();
    var city = searchParamsArr[2].split('=').pop()
    latCurrentVal = lat;
    lonCurrentVal = lon;
    cityCurrentVal = city;
    console.log(lat);
    console.log(lon);
    console.log(city);
}

getParams();

// Clear lat and lon on new search
function clearVals() {
    latCurrentVal = '';
    lonCurrentVal = '';
};

//clearVals();

//print current weather
function printCurrentWeather(resultObj) {
    var currentCard = document.createElement('div');
    currentCard.classList.add('card', 'col-sm-10');

    var currentCardBody = document.createElement('div');
    currentCardBody.classList.add('card-body');
    currentCard.append(currentCardBody);

    console.log(resultObj);

    var cityEl = document.createElement('h4');
    cityEl.textContent = cityCurrentVal;

    currentCardBody.append(cityEl);
    mainContentEl.append(currentCard);
}

function printWeather() {
    printCurrentWeather(currentWeather);
}

//Get current weather data from API
function searchCurrentApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + apiKey;
    console.log(currentQueryUrl)

    fetch(currentQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function (currRes){
            console.log(currRes)
            currentWeather = currRes;
            //if (!currRes.results){
                //mainContentEl.innerHTML = '<h3>City not found. Please try again.</h3>'
           // }

           console.log(currentWeather);
           printWeather();
        }
        

        )
       
}

searchCurrentApi(latCurrentVal, lonCurrentVal);

//Write current weather to page

//Get 5 day forecast from API

// Write 5 day forecast to page

//Add current city to local Storage

//Add buttons for cities in local storage to side bar

// new search from side bar