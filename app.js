const apiKey = "YOUR_API_KEY"; // Replace with your API key
// taking info from frontend (html)
const search = document.getElementById("search");
const locationBtn = document.getElementById("location");
const cityInput = document.getElementById("city");

// UI Elements (data to be stored)
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");
const toggleUnitSwitch = document.getElementById("toggleUnit");
const unitCelsiusLabel = document.getElementById("celsius");
const unitFahrenheitLabel = document.getElementById("fahrenheit");

// current temp and type of temp 
let currentTemperature = null;
let isCelsius = true;

// Initial location on page load (check the access of location)
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // console.log(latitude, longitude)
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                showErrorMessage("Geolocation access denied. Please enter a city manually.");
            }
        );
    } else {
        showErrorMessage("Geolocation is not supported by this browser.");
    }
});

// Event Listeners for Search btns
search.addEventListener("click", () => {
    const city = cityInput.value.trim();
    // console.log(city)
    if (city) {
        fetchWeatherByCity(city);
    } else {
        showErrorMessage("Please enter a city name!");
    }
});

// checking event on location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // console.log(latitude, longitude)
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                showErrorMessage("Unable to retrieve location. Please enable location services.");
            }
        );
    } else {
        showErrorMessage("Geolocation is not supported by this browser.");
    }
});

// Event listener for temperature unit toggle (C to F and vice Versa)
toggleUnitSwitch.addEventListener("change", () => {
    if (currentTemperature !== null) {
        // console.log(currentTemperature)
        isCelsius = !toggleUnitSwitch.checked;
        updateTemperatureDisplay();
    }
});

// Function to fetch weather by city using Axios (openweathermap)
async function fetchWeatherByCity(city) {
    hideErrorMessage();
    try {
        // link of api
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        updateUI(response.data);
    } catch (error) {
        showErrorMessage("City not found. Please try again.");
    }
}

// Function to fetch weather by coordinates (of locations) using Axios
async function fetchWeatherByCoords(lat, lon) {
    hideErrorMessage();
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        updateUI(response.data);
    } catch (error) {
        showErrorMessage("Could not retrieve weather data.");
    }
}

// Function to update the UI (data send to html / frontend)
function updateUI(data) {
    weatherCard.classList.remove("hidden");
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    
    currentTemperature = data.main.temp;
    isCelsius = true;
    toggleUnitSwitch.checked = false;
    updateTemperatureDisplay();

    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

// Function to update the temperature display based on the current unit
function updateTemperatureDisplay() {
    if (currentTemperature === null) return;
    
    if (isCelsius) {
        temperature.textContent = `${currentTemperature.toFixed(1)}°C`;
        unitCelsiusLabel.classList.add("active");
        unitFahrenheitLabel.classList.remove("active");
    } else {
        const tempFahrenheit = (currentTemperature * 9/5) + 32;
        temperature.textContent = `${tempFahrenheit.toFixed(1)}°F`;
        unitFahrenheitLabel.classList.add("active");
        unitCelsiusLabel.classList.remove("active");
    }
}

// Function to show/hide error messages
function showErrorMessage(message) {
    weatherCard.classList.add("hidden");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function hideErrorMessage() {
    errorMessage.classList.add("hidden");
}