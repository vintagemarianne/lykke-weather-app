let el = document.querySelector.bind(document),
  _elements = {
    currentDayOfWeek: el("#current-day-of-week"),
    currentTime: el("#current-time"),
    searchBtn: el("#search-btn"),
    searchInput: el("#search-input"),
    cityName: el("#city-name")
  };

let currentDate = new Date();

_elements.searchBtn.addEventListener("click", searchCity);

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

formatDate(currentDate);