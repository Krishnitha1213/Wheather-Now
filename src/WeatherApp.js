import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); 1 

  const apiKey = 'your_open_meteo_api_key'; // Replace with your actual API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current_weather=true&timezone=auto&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&city=${city}`);
      const data = await response.json();
      setWeatherData(data.current_weather);
      setError(null);
    } catch (error) {
      setError('An error occurred. Please try again.');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app container">
      <h1 className="text-center mb-4">Weather Now</h1>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">Get Weather</button>
      </form>
      {error && <p className="error text-center mt-4">{error}</p>}
      {weatherData && (
        <div className="weather-info card mx-auto mt-4">
          <div className="card-header">
            <h2>Weather for {weatherData.city_name}</h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Temperature: {weatherData.temperature}°C
            </li>
            <li className="list-group-item">Humidity:  {weatherData.relativehumidity}%</li>
            <li className="list-group-item">Wind Speed: {weatherData.windspeed} km/h</li>
            <li className="list-group-item">Weather: {weatherData.weathercode}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;