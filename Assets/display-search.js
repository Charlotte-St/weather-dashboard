var mainContentEl = document.getElementById('main-weather');
var forecastContentEl = document.getElementById('forecast-cards');
var searchHistoryEl = document.getElementById('search-history');
var latCurrentVal;
var lonCurrentVal;
var cityCurrentVal;
var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
var currentWeather; 
var forecastWeather;
var weatherHistory = [];

//mainContentEl.textContent = 'Weather Forecast';

function getParams() {
    var searchParamsArr = document.location.search.split('&');

    var lat = searchParamsArr[0].split('=').pop();
    var lon = searchParamsArr[1].split('=').pop();
    var city = searchParamsArr[2].split('=').pop().split('%20').join(' ');
    latCurrentVal = lat;
    lonCurrentVal = lon;
    cityCurrentVal = city;

}

getParams();

function printCurrentWeather(resultObj) {
    var currentCard = document.createElement('div');
    currentCard.classList.add('card', 'col-sm-10');

    var currentCardBody = document.createElement('div');
    currentCardBody.classList.add('card-body');
    currentCard.append(currentCardBody);


    var cityEl = document.createElement('h4');
    cityEl.textContent = cityCurrentVal;

    currentCardBody.append(cityEl);

    var currentDate = dayjs().format('MM-DD-YYYY');
    currentCardBody.append(currentDate);

    var currIcon = resultObj.weather[0].icon;
    var currIconUrl = 'https://openweathermap.org/img/wn/' + currIcon + '@2x.png';

    var currIconPrint = document.createElement('img');
    currIconPrint.src = currIconUrl;
    currentCardBody.append(currIconPrint);

    var currTemp = document.createElement('div');
    var temp = resultObj.main.temp;
    currTemp.textContent = 'Temp: ' + temp + 'F';
    currentCardBody.append(currTemp);

    var currWind = document.createElement('div');
    var windMph = resultObj.wind.speed;
    currWind.textContent = 'Wind: ' + windMph + 'MPH';
    currentCardBody.append(currWind);

    var currHumidity = document.createElement('div');
    var currHumidityVal = resultObj.main.humidity;
    currHumidity.textContent = 'Humidity: ' + currHumidityVal + '%';
    currentCardBody.append(currHumidity);

    mainContentEl.append(currentCard);
}

function printForecastWeather(resultObj){
    for (var i=0; i < resultObj.list.length; i++) {
        if (resultObj.list[i].dt_txt.split(' ')[1] === "12:00:00"){
       var forecastCard = document.createElement('div');
       forecastCard.classList.add('card', 'col-sm-2');
       var forecastTemp = resultObj.list[i].main.temp;
       var forecastDate = resultObj.list[i].dt_txt.split(" ")[0];
       var forecastIcon = resultObj.list[i].weather[0].icon;
       var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
       var forecastWind = resultObj.list[i].wind.speed;
       var forecastHumidity = resultObj.list[i].main.humidity;
        forecastCard.innerHTML = forecastDate + '</br><img src="' + forecastIconUrl + '"></br>Temp: ' + forecastTemp + 'F</br>Wind: ' + forecastWind + 'MPH</br>Humidity:' + forecastHumidity + '%';

       forecastContentEl.append(forecastCard);}
    }
}


function printWeather() {
    printCurrentWeather(currentWeather);
}
function printWeatherForecast(){
    printForecastWeather(forecastWeather);
}

//Get current weather data from API
function searchCurrentApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + apiKey;

    fetch(currentQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function (currRes){
            currentWeather = currRes;
           printWeather();
        }
        )
       
}

searchCurrentApi(latCurrentVal, lonCurrentVal);

//Get 5 day forecast from API
function searchForecastApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + apiKey;

    fetch(currentQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function (forecastRes){
            forecastWeather = forecastRes;
          
           printWeatherForecast();
}
        )
}

searchForecastApi(latCurrentVal, lonCurrentVal);


function readStoredWeather() {
    var history = localStorage.getItem('weatherHistory');
    if (history) {
      weatherHistory = JSON.parse(history);
    } else {
      weatherHistory = [];
    }
    return weatherHistory;
  }

  readStoredWeather();


function addToHistory(){
    var weatherHistory = readStoredWeather();
    if (latCurrentVal !== 0 && lonCurrentVal !==0){
        var location = {
            lat: latCurrentVal,
            lon: lonCurrentVal,
            city: cityCurrentVal
        };
        weatherHistory.unshift(location);
        localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
    }
}

addToHistory();
function addHistoryButtons () {
    if (weatherHistory){
        for (i = 0; i < weatherHistory.length; i++){
            console.log(weatherHistory[i])
            var cityLink = document.createElement('li');
            cityLink.classList.add('list-group-item');
            cityLink.innerHTML = '<a href="./search-results.html?lat=' + weatherHistory[i].lat + '&lon=' + weatherHistory[i].lon + '&city=' + weatherHistory[i].city + apiKey + '">' + weatherHistory[i].city + '</a>';

            searchHistoryEl.append(cityLink);
        }
    }
}

addHistoryButtons();

