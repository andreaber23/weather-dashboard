var weatherApiKey = '7bd88fc5034f484139c0ae09d042d15c';

function getForecast() {
  
    const newCity = document.getElementById("cityInput").value
    const cityName = document.getElementById('cityName');
    cityName.textContent = newCity
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(newCity)}&appid=7bd88fc5034f484139c0ae09d042d15c&cnt=5`

    fetch(apiUrl)
        .then(response => response.json())
        .then (data => {
            
            if (data.cod ===200){
            displayForecast(data);
            searchHistory(data.city.name)
} else {
    throw new Error(data.message);
}
})
        .catch(error => {
            console.log ('Error', error);
            document.getElementById('forecast').innerHTML='Error displaying forecast';
        })
        
}
function displayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';

    const cityName = document.getElementById('cityName');
    cityName.textContent= data.city.name ;
    forecast.appendChild(cityName);

    const temperatureKelvin = data.list[0].main.temp;
    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
    const temperature = document.createElement('p');
    temperature.innerHTML = `Temperature: ${temperatureFahrenheit.toFixed(2)} °F`
    forecast.appendChild(temperature);

    const wind = document.createElement('p');
    wind.innerHTML = `Wind: ${data.list[0].wind.speed} m/s`;
    forecast.appendChild(wind);

    const humidity = document.createElement('p');
    humidity.innerHTML= `Humidity: ${data.list[0].main.humidity}%`;
    forecast.appendChild(humidity);

}

function searchHistory(city) {
    const searchHistory = document.getElementById('search-history');
    const searchItem = document.createElement('div');
    searchItem.textContent = city;
    searchHistory.appendChild(searchItem);
}
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("#search-btn").addEventListener("click", () => {
        const searchedCity = document.querySelector('#cityInput');
        console.log(searchedCity.value);
        if(searchedCity.value){
            getForecast(searchedCity.value);
        }
    })})