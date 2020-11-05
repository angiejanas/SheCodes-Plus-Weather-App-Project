function formattedDate() {
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
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
    "December"
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}, <br /> ${month} ${date}, ${year}`;
}
function formattedTime() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");
let now = new Date();
currentDate.innerHTML = formattedDate();
currentTime.innerHTML = formattedTime();

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#displayed-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  document.querySelector("#condition").innerHTML = response.data.weather[0].description.toUpperCase();
}
function searchCity(city) {
  let apiKey = "3c253a53329d036c42d9260342b290bb";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function retrieveCurrentCityWeather(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "3c253a53329d036c42d9260342b290bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

}
function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentCityWeather);
}

function updateToFahrenheit(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = 66;
}
function updateToCelsius(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = 19;
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let fahrenheitTemp = document.querySelector("#fahr-link");
fahrenheitTemp.addEventListener("click", updateToFahrenheit);

let celsiusTemp = document.querySelector("#cel-link");
celsiusTemp.addEventListener("click", updateToCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");