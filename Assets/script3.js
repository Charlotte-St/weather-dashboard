var searchButtonEl = document.querySelector('#search-button');
var geocodeQueryUrl
var latResultVal
var lonResultVal

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
            console.log(geoResults.lat);
            console.log(geoResults.lon);
            latResultVal = geoResults.lat;
            lonResultVal = geoResults.lon;
            console.log(latResultVal);
            console.log(lonResultVal);
            var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
            var queryString = './search-results.html?lat=' + latResultVal + '&lon=' + lonResultVal + apiKey;
            console.log(queryString);
            location.assign(queryString);
            return
        })

}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('.search-input').value;
  
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  console.log(searchInputVal);
  var geocodeBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  var cityName = searchInputVal;
  var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c';
  geocodeQueryUrl = geocodeBaseUrl + cityName + apiKey;
  console.log(geocodeQueryUrl);
  geocodeApiQuery();


}



searchButtonEl.addEventListener('click', handleSearchFormSubmit);