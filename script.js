const apiKey = '803aad1a1d87010321d7bd4a0d759b4d';
const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=47.0502&lon=8.3093&appid=${apiKey}&units=metric`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=47.0502&lon=8.3093&appid=${apiKey}&units=metric`;

function updateWindData(url, currentElementId, directionElementId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const windSpeedMps = data.wind.speed;
      const windSpeedKph = (windSpeedMps * 3.6).toFixed(2); // Convert m/s to km/h
      const windDirection = data.wind.deg;

      const windSpeedElement = document.getElementById(currentElementId);
      const windDirectionElement = document.getElementById(directionElementId);

      windSpeedElement.innerText = `Wind Speed: ${windSpeedKph} km/h`;
      windDirectionElement.innerText = `Wind Direction: ${windDirection}°`;
    })
    .catch(error => {
      console.error('Error fetching wind data:', error);
    });
}

updateWindData(currentApiUrl, 'current-wind-speed', 'current-wind-direction'); // Current data
updateWindData(forecastApiUrl, 'tomorrow-wind-speed', 'tomorrow-wind-direction'); // Tomorrow's forecast
