let el = document.querySelector.bind(document),
  isCurrentTempUnitCelsius = true,
  _elements = {
    currentDayOfWeek: el("#current-day-of-week"),
    currentTime: el("#current-time"),
    searchBtn: el("#search-btn"),
    searchInput: el("#search-input"),
    cityName: el("#city-name"),
    tempUnitBtn: el("#temp-unit-btn"),
    currentTemp: el("#current-temp")
  };

let currentDate = new Date();

_elements.searchBtn.addEventListener("click", searchCity);
_elements.tempUnitBtn.addEventListener("click", changeUnit);

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
  _elements.cityName.innerHTML = _elements.searchInput.value ? _elements.searchInput.value : "New York, NY, USA";
}

function changeUnit(event) {
  event.preventDefault();
  let currentTemp = _elements.currentTemp.innerHTML;

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