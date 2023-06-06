let el = document.querySelector.bind(document),
  isCurrentTempUnitCelsius = true,
  apiKey = "616b14cbd38253313b3b8852fa77335d",
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
    weatherResultContainer: el("#weather-result-container"),
    weatherDesc: el("#weather-desc"),
    currentWeatherIcon: el("#current-weahter-icon"),
    emptyState: el("#empty-state")
  };

let currentDate = new Date();

_elements.searchBtn.addEventListener("click", searchCity);
// _elements.tempUnitBtn.addEventListener("click", changeUnit);

function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  _elements.currentDayOfWeek.innerHTML = `${daysOfWeek[date.getDay()]},`;
  _elements.currentTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
}

function searchCity(event) {
  event.preventDefault();
  cityName = _elements.searchInput.value;
  if (cityName === null) {
    _elements.weatherResultContainer.style.display = "none";
    _elements.emptyState.style.display = "flex";
    return;
  }

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(showCityInfo)
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.message);
      _elements.searchInput.value = null;
      _elements.weatherResultContainer.style.display = "none";
      _elements.emptyState.style.display = "flex";
    });
}

function showCityInfo(response) {
  _elements.weatherResultContainer.style.display = "flex";
  _elements.emptyState.style.display = "none";
  currentTemp = Math.round(response.data.main.temp);
  _elements.currentTemp.innerHTML = currentTemp;
  cityName = response.data.name;
  _elements.cityName.innerHTML = `${cityName}, ${response.data.sys.country}`;
  _elements.weatherDesc.innerHTML = response.data.weather[0].description;
  _elements.currentWeatherIcon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
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

formatDate(currentDate);