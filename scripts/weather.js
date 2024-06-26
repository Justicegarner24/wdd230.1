const apiKey = "1e627a45cdd86e20f4c6b23a4983a9aa";

// Idaho Falls/lincoln Idaho
// 43.49337448355192, -112.03821506055607

const lat = 43.49337448355192;
const lon = -112.03821506055607;


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;


fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/orem%20Utah?unitGroup=us&key=YOUR_API_KEY&contentType=json", {
  "method": "GET",
  "headers": {
  }
  })
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetch();

function displayResults(data) {
    const location = document.querySelector("#location");

    const tempArea = document.querySelector(".temp-area");

    const captionDesc = document.querySelector("#weather-description");
    const feelsLike = document.querySelector("#feels-like");
    const windSpeed = document.querySelector("#wind-speed");
    const humidity = document.querySelector("#humidity");

    const weatherIcon = document.createElement("img");
    tempArea.appendChild(weatherIcon);

    const currentTemp = document.createElement("span");
    currentTemp.setAttribute("id", "current-temp");
    tempArea.appendChild(currentTemp);

    location.innerHTML = data.name;

    const formattedTemp = data.main.temp.toFixed(0);

    currentTemp.innerHTML = `${formattedTemp}&deg;F`;
    feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${data.wind.speed.toFixed(0)}mph`;
    humidity.innerHTML = `${data.main.humidity}%`;


    data.weather.forEach((weatherEvent) => {
        const iconsrc = 'https://www.visualcrossing.com/weather/weather-data-services/orem?v=api#';
        let desc = weatherEvent.description;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", desc);
        weatherIcon.setAttribute("width", "100");
        weatherIcon.setAttribute("height", "100");
        captionDesc.innerHTML = `${desc}`;
    });
}