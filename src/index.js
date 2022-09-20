function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let presentDate = new Date();
  let currentDay = days[presentDate.getDay()];
  let currentDate = presentDate.getDate();
  let currentMonth = months[presentDate.getMonth()];
  let currentHour = presentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMiunte = presentDate.getMinutes();
  if (currentMiunte < 10) {
    currentMiunte = `0${currentMiunte}`;
  }

  return `${currentDay} ${currentDate} ${currentMonth} ${currentHour}:${currentMiunte}`;
}

let updatedDate = document.querySelector("#date");
let currentTime = new Date();
updatedDate.innerHTML = formatDate(currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp");
  let tempElement = (celsiusTemp * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = Math.round(tempElement);
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temp");
  celsiusTemperature.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", convertToCelsius);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemp = math.round(response.data.main.temp);
}

function searchCity(city) {
  let apiKey = "bdc96064ff0660a2e7648f3da299d4f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  searchCity("Woking");
}

function searchLocation(position) {
  let apiKey = "bdc96064ff0660a2e7648f3da299d4f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Woking");
