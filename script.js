const apiKey = 'YOUR_API_KEY_HERE'; // Unga OpenWeatherMap API Key-a inge paste pannunga
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityName = document.getElementById('city-name');
const weatherDesc = document.getElementById('weather-desc');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

async function fetchWeather(city) {
    if (!city) return;

    try {
        errorMsg.classList.add('hidden');
        weatherInfo.classList.add('hidden');

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        showError(err.message);
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDesc.textContent = data.weather[0].description;
    temp.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;

    weatherInfo.classList.remove('hidden');
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        fetchWeather(city);
    }
});
