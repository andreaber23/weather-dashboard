var WeatherApiKey = '7bd88fc5034f484139c0ae09d042d15c';

function getForecast(event) {
    event.preventDefault();
    const apiUrl ='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
    const city = document.getElementById('city').value;

    fetch(apiUrl)
        .then(response => response.json())
        .then (data => {
            displayForecast(data);
            searchHistory(city)
        })
        .catch(error => {
            console.log ('Error', error);
            document.getElementById('forecast').innerHTML='Error displaying forecast'
        })
}

function displayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';

    const cityName = document.createElement('h2');
    cityName.textContent= document.getElementById('city').value ;
    forecast.appendChild(cityName);

    const temperature = document.createElement('p');
    temperature.innerHTML = 'Temperature: ${data.list[0].main.temp}' ; 
    forecast.appendchild(temperature);

    const wind = document.createElement('p');
    wind.innerHTML = 'Wind: ${data.list[0].wind.speed} m/s';
    forecast.appendChild(wind);

    const humidity = document.createElement('p');
    humidity.innerHTML= 'Humidity ${data.list[0].main.humidity}%';
    forecast.appendChild(humidity);
}

function searchHistory(city) {
    const searchHistory = document.getElementById('search-history');
    const searchItem = document.createElement('div');
    searchItem.textContent = city;
    searchHistory.appendChild(searchItem);
}