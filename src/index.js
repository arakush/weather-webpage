// Alert the current date and time
let currentDate = new Date();

let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let standardClock = [
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11
];

let amOrPm = [
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "AM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM",
  "PM"
];

let currentAmOrPm = amOrPm[currentDate.getHours()];

let currentDay = dayOfWeek[currentDate.getDay()];

let currentTimeInHours = standardClock[currentDate.getHours()];

let currentTimeInMinutes = currentDate.getMinutes();

if (currentTimeInMinutes < 10) {
  currentTimeInMinutes = `0${currentTimeInMinutes}`;
}

let monthOfYear = [
  "January",
  "Feburary",
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

let currentDayOfMonth = currentDate.getDate();

let currentYear = currentDate.getFullYear();

let currentMonth = monthOfYear[currentDate.getMonth()];

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cf6b8194016912df82754ee3a929198&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

// Default city is Vancouver, BC, Canada
searchCity("Vancouver");

function showCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#enter-city");
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${currentCity.value}`;
  searchCity(currentCity.value);
}

let searchButton = document.querySelector("#find-form");
searchButton.addEventListener("submit", showCity);

function displayCurrentDateAndTime(newCurrentDate) {
  newCurrentDate = `${currentDay}, ${currentMonth} ${currentDayOfMonth}, ${currentYear} ${currentTimeInHours}:${currentTimeInMinutes} ${currentAmOrPm}`;
  return newCurrentDate;
}

let h4 = document.querySelector("h4");
h4.innerHTML = displayCurrentDateAndTime();

let enterACity = document.querySelector("form#find-form");
enterACity.addEventListener("submit", showCity);

function showTemp(response) {
  console.log(response.data.main.temp);
  let currentTemp = document.querySelector("h2.citysCurrentTemp");
  let currentTempHigh = document.querySelector("h6.citysCurrentTempHigh");
  let currentTempLow = document.querySelector("h6.citysCurrentTempLow");
  let currentWeatherDescription = document.querySelector(
    "h6.weatherDescription"
  );
  let currentHumidity = document.querySelector("span.humidityNum");
  let currentWind = document.querySelector("span.windNum");
  let h1 = document.querySelector("h1");
  let changeTitle = document.querySelector("title");
  changeTitle.innerHTML = `Weather in ${response.data.name} 🌦`;

  celsiusTemp = response.data.main.temp;

  celsiusTempMax = response.data.main.temp_max;
  celsiusTempMin = response.data.main.temp_min;

  // Current Temperature
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}°`;
  // Highest temperature of the day
  currentTempHigh.innerHTML = `H:${Math.round(response.data.main.temp_max)}°`;
  // Lowest temperature of the day
  currentTempLow.innerHTML = `L:${Math.round(response.data.main.temp_min)}°`;
  // Current weather description eg. "Windy"
  currentWeatherDescription.innerHTML = `${response.data.weather[0].main}`;
  // Current humidity
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  // Current wind speed
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  // Change name of city
  h1.innerHTML = `${response.data.name}`;

  if (currentWeatherDescription.innerHTML === "Clouds") {
    document.body.style.backgroundImage = `url('https://media.giphy.com/media/KwZoSJlvep6Vy/giphy.gif')`;
  } else if (currentWeatherDescription.innerHTML === "Haze") {
    document.body.style.backgroundImage = `url('https://media.giphy.com/media/AxVvjYP5ruIj3FfrS8/giphy.gif')`;
  } else if (currentWeatherDescription.innerHTML === "Clear") {
    document.body.style.backgroundImage = `url('https://media.giphy.com/media/Uiujny6Aqrg40/giphy.gif')`;
  } else if (currentWeatherDescription.innerHTML === "Rain") {
    document.body.style.backgroundImage = `url('https://media.giphy.com/media/exfSTanP4prYQ/giphy.gif')`;
  } else if (currentWeatherDescription.innerHTML === "Snow") {
    document.body.style.backgroundImage = `url('https://media.giphy.com/media/BDucPOizdZ5AI/giphy.gif')`;
  }
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3cf6b8194016912df82754ee3a929198&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function currentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentbutton = document.querySelector("#current-location-button");
currentbutton.addEventListener("click", currentTemp);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".citysCurrentTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitTempMax = (celsiusTempMax * 9) / 5 + 32;
  let fahrenheitTempMin = (celsiusTempMin * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°`;
  let tempMax = document.querySelector(".citysCurrentTempHigh");
  tempMax.innerHTML = `H:${Math.round(fahrenheitTempMax)}°`
  let tempMin = document.querySelector(".citysCurrentTempLow");
  tempMin.innerHTML = `L:${Math.round(fahrenheitTempMin)}°`
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".citysCurrentTemp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}°`;
  let tempMax = document.querySelector(".citysCurrentTempHigh");
  tempMax.innerHTML = `H:${Math.round(celsiusTempMax)}°`
  let tempMin = document.querySelector(".citysCurrentTempLow");
  tempMin.innerHTML = `L:${Math.round(celsiusTempMin)}°`
}

let celsiusTemp = null;
let celsiusTempMax = null;
let celsiusTempMin = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);