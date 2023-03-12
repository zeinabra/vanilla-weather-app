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

function displayTempreture(response) {
  let tempretureElement = document.querySelector("#temperature");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
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
searchCity("paris");
let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", handleSubmit);
