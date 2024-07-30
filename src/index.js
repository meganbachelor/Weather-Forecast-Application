function getWeather(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `, Wind: ${response.data.wind.speed}km/h`;

  if (description.includes("cloud")) {
    iconElement.innerHTML = "Cloud";
  } else if (description.includes("sun")) {
    iconElement.innerHTML = "Sunny";
  } else if (description.includes("rain")) {
    iconElement.innerHTML = "Rainy";
  } else if (description.includes("thunderstorm")) {
    iconElement.innerHTML = "Thunderstorm";
  } else if (description.includes("snow")) {
    iconElement.innerHTML = "Weather_Snowy";
  } else if (description.includes("clear")) {
    iconElement.innerHTML = "Clear_Day";
  }
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "58c32ct4af077777ac72ab80o05e54b7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
