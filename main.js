import conditions from "./conditions.js";

const apiKey = "50f3877d4083433885f232549242402";

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function clearInput() {
  input.value = "";
}

function removeCard() {
  const prevCard = document.querySelector(".card");

  if (prevCard) {
    prevCard.remove();
  }
}

function showCard(html) {
  header.insertAdjacentHTML("afterend", html);
}

function showError(error) {
  const html = `<div class="card">${error}</div>`;
  showCard(html);
}

function showWeatherCard({ location, country, temp, condition, imgPathLocal }) {
  const html = `<div class="card">
  <h2 class="card-city">${location} <span>${country}</span></h2>
  <div class="card-weather">
    <div class="card-value">${temp}<sup>°c</sup></div>
    <!--  +11&#8451; -->

    <img class="card-img" src="${imgPathLocal}" alt="Weather img" />
  </div>
  <div class="card-desc">${condition}</div>
</div>`;
  showCard(html);
}

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (e) {
  e.preventDefault();
  let city = input.value.trim();

  const data = await getWeather(city);

  clearInput();
  removeCard();

  if (data.error) {
    showError(data.error.message);
  } else {
    // await fetch("./conditions.json");
    console.log(data.current.condition.code);

    const imgPath = data.current.condition.icon;
    console.log(imgPath);
    const imgPathLocal = imgPath.replace(
      "//cdn.weatherapi.com/weather/64x64",
      "./img/weather"
    );
    console.log(imgPathLocal);

    const info = conditions.find(
      (obj) => obj.code === data.current.condition.code
    );

    console.log(info.languages[23].day_text);

    // const filePath = data.current.condition.is_day
    // ? './img/weather/day'
    // : './img/weather/night';

    const conditionText = data.current.condition.is_day
      ? info.languages[23].day_text
      : info.languages[23].night_text;

    const weatherData = {
      location: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: conditionText,
      imgPathLocal,
      // condition: data.current.condition.text,
    };

    showWeatherCard(weatherData);
  }
};
