# 🌤️ Weather App
A simple weather dashboard that fetches live weather data from the **OpenWeather API**. You can search by city or use your current location. The app also supports unit switching (°C ↔ °F).

## ✨ Features
- Real-time weather data (temperature, humidity, wind speed, description).
- Auto-detect location using the Geolocation API.
- City search option.
- Temperature toggle between Celsius and Fahrenheit.
- Weather icons that match the current conditions.
- Responsive design – works on desktop and mobile.

## 🚀 Getting Started
1. Get an OpenWeather API Key:
   - Sign up at [OpenWeather](https://openweathermap.org/).
   - Copy your API key.
   - Open `app.js` and replace the placeholder at the top:
     ```js
     const apiKey = "YOUR_API_KEY";
     ```
2. Run Locally:
   - Clone this repository:
     ```bash
     git clone https://github.com/1-ashish-04/Weather-App.git
     ```
   - Open `index.html` in your browser (or use VS Code Live Server).

## 🛠️ Tech Stack
- HTML5 – structure
- CSS3 – styling and responsive UI
- JavaScript (ES6+) – app logic
- Axios – API requests
- OpenWeather API – weather data
- Geolocation API – detect user location

## 🐛 Troubleshooting
- Weather not showing? → Check if your API key is valid in `app.js`.
- Location denied? → Enter the city manually in the search bar.
- CORS issue in development? → Run with Live Server or any local server.

## 📝 Notes
- Free OpenWeather API has rate limits. Avoid too many requests in a short time.
- If location access is denied, an error message will appear, and you can still search manually.

## ✅ Status
Project is working and tested on modern browsers.
