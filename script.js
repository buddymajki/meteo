const apiKey = '803aad1a1d87010321d7bd4a0d759b4d';
const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=47.0502&lon=8.3093&appid=${apiKey}&units=metric`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=47.0502&lon=8.3093&appid=${apiKey}&units=metric`;

function updateWindData(url, elementIdPrefix) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const windEntries = data.list;

      // Find the wind data for tomorrow at midday (12:00 PM)
      const tomorrowMiddayEntry = windEntries.find(entry => {
        const entryTime = new Date(entry.dt * 1000);
        return entryTime.getDate() === new Date().getDate() + 1 && entryTime.getHours() === 12;
      });

      if (tomorrowMiddayEntry) {
        const windSpeedMps = tomorrowMiddayEntry.wind.speed;
        const windSpeedKph = (windSpeedMps * 3.6).toFixed(2); // Convert m/s to km/h
        const windDirection = tomorrowMiddayEntry.wind.deg;

        const windSpeedElement = document.getElementById(`${elementIdPrefix}-wind-speed`);
        const windDirectionElement = document.getElementById(`${elementIdPrefix}-wind-direction`);

        windSpeedElement.innerText = `Wind Speed: ${windSpeedKph} km/h`;
        windDirectionElement.innerText = `Wind Direction: ${windDirection}°`;

        // Apply color based on wind speed
        if (windSpeedKph < 15) {
          windSpeedElement.style.color = 'green';
        } else if (windSpeedKph >= 15 && windSpeedKph <= 25) {
          windSpeedElement.style.color = 'orange';
        } else {
          windSpeedElement.style.color = 'red';
        }
      } else {
        console.error('Wind data for tomorrow at midday not found.');
      }
    })
    .catch(error => {
      console.error('Error fetching wind data:', error);
    });
}

document.getElementById('refresh-button').addEventListener('click', () => {
  updateWindData(currentApiUrl, 'current'); // Current data
  updateWindData(forecastApiUrl, 'tomorrow-midday'); // Tomorrow's forecast at midday
});

// Initial data load when the page is loaded
updateWindData(currentApiUrl, 'current');
updateWindData(forecastApiUrl, 'tomorrow-midday');
