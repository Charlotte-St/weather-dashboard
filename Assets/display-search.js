var mainContentEl = document.getElementById('main-weather');
var latCurrentVal;
var lonCurrentVal;
var cityCurrentVal;
var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
var currentWeather; 
var forecastWeather;


//mainContentEl.textContent = 'Weather Forecast';

function getParams() {
    var searchParamsArr = document.location.search.split('&');

    var lat = searchParamsArr[0].split('=').pop();
    var lon = searchParamsArr[1].split('=').pop();
    var city = searchParamsArr[2].split('=').pop()
    latCurrentVal = lat;
    lonCurrentVal = lon;
    cityCurrentVal = city;
    //console.log(lat);
    //console.log(lon);
    //console.log(city);
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

    //console.log(resultObj);

    var cityEl = document.createElement('h4');
    cityEl.textContent = cityCurrentVal;

    currentCardBody.append(cityEl);
    //mainContentEl.append(currentCard);

    //var currentDate = new Date(resultObj.dt).toLocalTimeString("en-US");
    var currentDate = dayjs().format('MM-DD-YYYY');
    //console.log(currentDate);
    currentCardBody.append(currentDate);

    var currIcon = resultObj.weather[0].icon;
    //console.log(currIcon);
    var currIconUrl = 'https://openweathermap.org/img/wn/' + currIcon + '@2x.png';
    //console.log(currIconUrl);

    var currIconPrint = document.createElement('img');
    currIconPrint.src = currIconUrl;
    currentCardBody.append(currIconPrint);

    var currTemp = document.createElement('div');
    var temp = resultObj.main.temp;
    //console.log(temp);
    currTemp.textContent = 'Temp: ' + temp + 'F';
    currentCardBody.append(currTemp);

    var currWind = document.createElement('div');
    var windMph = resultObj.wind.speed;
    //console.log(windMph);
    currWind.textContent = 'Wind: ' + windMph + 'MPH';
    currentCardBody.append(currWind);

    var currHumidity = document.createElement('div');
    var currHumidityVal = resultObj.main.humidity;
    //console.log(currHumidityVal);
    currHumidity.textContent = 'Humidity: ' + currHumidityVal + '%';
    currentCardBody.append(currHumidity);

    mainContentEl.append(currentCard);
}

function printForecastWeather(resultObj){
    console.log(resultObj);
    console.log(resultObj.list[0].dt_txt.split(" ")[1]);
    console.log(resultObj.list.length);
    for (var i=0; i < resultObj.list.length; i++) {
        if (resultObj.list[i].dt_txt.split(' ')[1] === "12:00:00"){
       console.log(resultObj.list[i].dt_txt.split(" ")[1]);
    //}
       var forecastCard = document.createElement('div');
       //forecastWeather.classList.add('card', 'col-sm-3');
    forecastCard.textContent = resultObj.list[i].main.temp;
       mainContentEl.append(forecastCard);}
    }
}


function printWeather() {
    printCurrentWeather(currentWeather);
}
function printWeatherForecast(){
    printForecastWeather(forecastWeather);
}

//Print weather forecast

//printForecast();


//Get current weather data from API
function searchCurrentApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + apiKey;
    //console.log(currentQueryUrl)

    fetch(currentQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function (currRes){
            //console.log(currRes)
            currentWeather = currRes;
            //if (!currRes.results){
                //mainContentEl.innerHTML = '<h3>City not found. Please try again.</h3>'
           // }

           //console.log(currentWeather);
           printWeather();
        }
        

        )
       
}

searchCurrentApi(latCurrentVal, lonCurrentVal);

//Get 5 day forecast from API
function searchForecastApi(lat, lon) {
    var currentQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    currentQueryUrl = currentQueryUrl + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + apiKey;
    //console.log(currentQueryUrl)

    fetch(currentQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function (forecastRes){
            //console.log(currRes)
            forecastWeather = forecastRes;
            //if (!currRes.results){
                //mainContentEl.innerHTML = '<h3>City not found. Please try again.</h3>'
           // }

           //console.log(forecastWeather);
           printWeatherForecast();
}
        )
}

searchForecastApi(latCurrentVal, lonCurrentVal);

// Write 5 day forecast to page
//function printForecastWeather(resultObj){
    //console.log(resultObj);
    //console.log(resultObj.list[0].dt_txt.split(" ")[1]);
    //console.log(resultObj.list.length);
    //for (var i=0; i < resultObj.length; i++) {
      //  console.log(resultObj.list[i].dt_txt.split(" ")[1]);
    //}
//}
//function printForecast(forecastWeather) {
  //  console.log(forecastWeather);
    //console.log(forecastWeather.list);
//}

//printForecast(forecastWeather);
//Add current city to local Storage

//Add buttons for cities in local storage to side bar

// new search from side bar