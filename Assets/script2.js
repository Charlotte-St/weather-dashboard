var searchButtonEl = document.querySelector('#search-button');
var geocodeQueryUrl

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
  var apiKey = '&appid=544a677c24a40aec4562a9114d5e303c'
  geocodeQueryUrl = geocodeBaseUrl + cityName + apiKey;
  console.log(geocodeQueryUrl);

}

searchButtonEl.addEventListener('click', handleSearchFormSubmit);
