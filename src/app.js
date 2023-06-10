let el = document.querySelector.bind(document),
  isCurrentTempUnitCelsius = true,
  apiKey = "097cb4o302a7bf9c0ffe72t43bdface5",
  celsiusTemp = 0,
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
_elements.tempUnitBtn.addEventListener("click", changeUnit);

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
  celsiusTemp = response.data.temperature.current;
  cityName = response.data.city;
  formatDate(response.data.time);
  _elements.weatherResultContainer.style.display = "flex";
  _elements.emptyState.style.display = "none";
  _elements.currentTemp.innerHTML = Math.round(celsiusTemp);
  _elements.cityName.innerHTML = `${cityName}, ${response.data.country}`;
  _elements.currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  _elements.currentWind.innerHTML = `${response.data.wind.speed} Km/H`;
  _elements.currentWeatherDesc.innerHTML = `, ${response.data.condition.description}`;
  _elements.currentWeatherIcon.setAttribute("src", response.data.condition.icon_url);
  _elements.currentWeatherIcon.setAttribute("alt", response.data.condition.icon);
}

function changeUnit(event) {
  event.preventDefault();
  if (isCurrentTempUnitCelsius) {
    _elements.tempUnitBtn.innerHTML = "F";
    _elements.currentTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  } else {
    _elements.tempUnitBtn.innerHTML = "C";
    _elements.currentTemp.innerHTML = Math.round(celsiusTemp);
  }

  isCurrentTempUnitCelsius = !isCurrentTempUnitCelsius;
}