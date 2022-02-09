function getDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minute}`;
}

function searchCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#cityInput");
  sentence.innerHTML = ` in <em> ${chosenCity.value}  </em> today, and over the next few days...`;
  let wxUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric&appid=bd3ff741f58b13df62ca6260d9e2d474`;
  axios.get(wxUrl).then(showTemperature);
}

function showTemperature(response) {
  let high = document.querySelector("#todayHigh");
  let low = document.querySelector("#todayLow");
  let wxCondition = document.querySelector("#conditions");
  let tempH = Math.round(response.data.main.temp);
  let tempL = Math.round(response.data.main.temp_min);
  let wxDescription = response.data.weather[0].main;

  high.innerHTML = `${tempH}˚ `;
  low.innerHTML = `${tempL}˚`;
  wxCondition.innerHTML = `${wxDescription}`;
}

let dtg = document.querySelector("#the-dtg");
let now = new Date();
let searchButton = document.querySelector("#search-bar");

dtg.innerHTML = getDate(now);
searchButton.addEventListener("submit", searchCity);
