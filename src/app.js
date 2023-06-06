let el = document.querySelector.bind(document),
  isCurrentTempUnitCelsius = true,
  apiKey = "097cb4o302a7bf9c0ffe72t43bdface5",
  currentTemp = 0,
  cityName = null,
  _elements = {
    currentDayOfWeek: el("#current-day-of-week"),
    currentTime: el("#current-time"),
    searchBtn: el("#search-btn"),
    searchInput: el("#search-input"),
    cityName: el("#city-name"),
    tempUnitBtn: el("#temp-unit-btn"),
    currentTemp: el("#current-temp"),
    currentWeatherDesc: el("#current-weather-desc"),
    weatherResultContainer: el("#weather-result-container"),
    currentHumidity: el("#current-humidity"),
    currentWind: el("#current-wind"),
    currentWeatherIcon: el("#current-weahter-icon"),
    emptyState: el("#empty-state")
  };

_elements.searchBtn.addEventListener("click", searchCity);
// _elements.tempUnitBtn.addEventListener("click", changeUnit);

function formatDate(timestamp) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var date = new Date(timestamp * 1000);
  _elements.currentDayOfWeek.innerHTML = `${daysOfWeek[date.getDay()]},`;
  _elements.currentTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
}

function searchCity(event) {
  event.preventDefault();
  cityName = _elements.searchInput.value;
  if (cityName.length === 0) {
    _elements.weatherResultContainer.style.display = "none";
    _elements.emptyState.style.display = "flex";
    return;
  }

  axios.get(`https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`)
    .then(showCityInfo)
    .catch(function (error) {
      alert(error.response.data.message);
      _elements.searchInput.value = null;
      _elements.weatherResultContainer.style.display = "none";
      _elements.emptyState.style.display = "flex";
    });
}

function showCityInfo(response) {
  _elements.weatherResultContainer.style.display = "flex";
  _elements.emptyState.style.display = "none";
  currentTemp = Math.round(response.data.temperature.current);
  _elements.currentTemp.innerHTML = `${currentTemp} °<button class="temp-unit" id="temp-unit-btn" title="Change unit">C</button>      ,`;
  cityName = response.data.city;
  _elements.cityName.innerHTML = `${cityName}, ${response.data.country}`;
  _elements.currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  _elements.currentWeatherIcon.src = response.data.condition.icon_url;
  _elements.currentWind.innerHTML = `${response.data.wind.speed} Km/H`;
  _elements.currentWeatherDesc.innerHTML = `${response.data.condition.description}`;
  formatDate(response.data.time);
}

function changeUnit(event) {
  event.preventDefault();
  currentTemp = _elements.currentTemp.innerHTML;

  if (isCurrentTempUnitCelsius) {
    _elements.tempUnitBtn.innerHTML = "F";
    currentTemp = currentTemp * 1.8 + 32;
  } else {
    _elements.tempUnitBtn.innerHTML = "C";
    currentTemp = (currentTemp - 32) / 1.8;
  }

  _elements.currentTemp.innerHTML = currentTemp;
  isCurrentTempUnitCelsius = !isCurrentTempUnitCelsius;
}