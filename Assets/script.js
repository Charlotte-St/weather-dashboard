var searchButtonEl = document.querySelector('#search-button');
var geocodeQueryUrl;
var latResultVal;
var lonResultVal;
var cityName;

//Gets data from the API
function geocodeApiQuery (){
    fetch(geocodeQueryUrl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(geoRes) {
            console.log(geoRes)
            return geoRes
        })
        .then(function(resultObj){
            var geoResults = resultObj[0];
            latResultVal = geoResults.lat;
            lonResultVal = geoResults.lon;
            cityName = geoResults.name;
            var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
            var queryString = './search-results.html?lat=' + latResultVal + '&lon=' + lonResultVal + '&city=' + cityName + apiKey;
            location.assign(queryString);
            return
        })

}

//Handles search, including constructing query string

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('.search-input').value;
  
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var geocodeBaseUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
  var cityName = searchInputVal;
  var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
  geocodeQueryUrl = geocodeBaseUrl + cityName + apiKey;
  geocodeApiQuery();


}



searchButtonEl.addEventListener('click', handleSearchFormSubmit);