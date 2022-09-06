function formatedDate(now) {
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `${minutes}`;
  }
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

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[now.getDay()];
  return `${day} ${date} ${month} ${hours}:${minutes}`;
}

function findCity(citySearch) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  degrees.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}
function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector(".enter-city").value;
  findCity(citySearch);
}
function convertToFarenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#degrees");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  degrees.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let now = new Date();
currentDate.innerHTML = formatedDate(now);

let city = document.querySelector(".find-city");
city.addEventListener("submit", handleSubmit);

let farenheitTemperature = document.querySelector("#farenheit");
farenheitTemperature.addEventListener("click", convertToFarenheit);

let buttonGeolocation = document.querySelector("#geolocationButton");
buttonGeolocation.addEventListener("click", getGeolocation);

findCity("Kyiv");
