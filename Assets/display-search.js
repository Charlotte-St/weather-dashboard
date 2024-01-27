var mainContentEl = document.getElementById('main-weather');

mainContentEl.textContent = 'Weather Forecast';

function getParams() {
    var searchParamsArr = document.location.search.split('&');

    var lat = searchParamsArr[0].split('=').pop();
    var lon = searchParamsArr[1].split('=').pop();

    console.log(lat);
    console.log(lon);
}

getParams();