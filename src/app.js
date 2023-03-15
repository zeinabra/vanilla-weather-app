function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <div class="weather-forecast-icon">
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="${forecastDay.weather[0].description}"
                    id="icon"
                    width="42"
                  />
                </div>
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  apiKey = "842b36d55cb28eba74a018029d56b04c";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTempreture(response) {
  let tempretureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  tempretureElement.innerHTML = celsiusTemperature;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}
function displayFahranheitTemp(event) {
  event.preventDefault();
  let fahranheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let tempretureElement = document.querySelector("#temperature");
  tempretureElement.innerHTML = fahranheitTemperature;
  celsiusLink.classList.remove("active");
  fahranheitLink.classList.add("active");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#temperature");
  tempretureElement.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahranheitLink.classList.remove("active");
}
let celsiusTemperature = null;
let fahranheitLink = document.querySelector("#fahranheit-link");
fahranheitLink.addEventListener("click", displayFahranheitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", handleSubmit);
searchCity("paris");
