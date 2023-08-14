const apiKey = '803aad1a1d87010321d7bd4a0d759b4d';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=47.0502&lon=8.3093&appid=${apiKey}&units=metric`;

function updateWindData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;

      const windSpeedElement = document.getElementById('wind-speed');
      const windDirectionElement = document.getElementById('wind-direction');

      windSpeedElement.innerText = `Wind Speed: ${windSpeed} km/h`;
      windDirectionElement.innerText = `Wind Direction: ${windDirection}°`;
    })
    .catch(error => {
      console.error('Error fetching wind data:', error);
    });
}

updateWindData(); // Initial call
setInterval(updateWindData, 5 * 60 * 1000); // Refresh every 5 minutes