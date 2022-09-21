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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let tempElement = (celsiusTemp * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = Math.round(tempElement);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let celsiusTemperature = document.querySelector("#temp");
  celsiusTemperature.innerHTML = Math.round(celsiusTemp);
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
  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
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
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
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

function getForecast(coordinates) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#days");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="smallcard1" style="width: 15rem;">
              <div class="card-body">
                <p class="card-text">${formatDay(
                  forecastDay.dt
                )} <br /> <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="45"/> <br /> L:${Math.round(
          forecastDay.temp.max
        )}°C H:${Math.round(forecastDay.temp.min)}°C</p>
              </div>
          </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Woking");
