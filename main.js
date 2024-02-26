const apiKey = "50f3877d4083433885f232549242402";

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

form.onsubmit = function (e) {
  e.preventDefault();
  let city = input.value.trim();

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html;
      const prevCard = document.querySelector(".card");

      if (prevCard) {
        prevCard.remove();
      }

      if (!data.error) {
        console.log(data);
        console.log(data.location.name);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.code);
        console.log(data.current.condition.text);
        console.log(data.current.feelslike_c);
        console.log(data.current.humidity);
        console.log(data.current.precip_mm);
        console.log(data.current.wind_mph);
        console.log(data.current.wind_dir);
        console.log(data.current.cloud);
        console.log(data.current.is_day);

        const html = `<div class="card">
      <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
      <div class="card-weather">
        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
        <!--  +11&#8451; -->

        <img class="card-img" src="./img/example.png" alt="Example img" />
      </div>
      <div class="card-desc">${data.current.condition.text}</div>
    </div>`;
        header.insertAdjacentHTML("afterend", html);
      } else {
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML("afterend", html);
      }
      // header.insertAdjacentHTML("afterend", html);
    });
};
