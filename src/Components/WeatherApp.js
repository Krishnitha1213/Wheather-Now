import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 1  // Track loading state

  const apiKey = 'your_open_meteo_API_key'; // Replace with your actual API key

  const fetchWeatherData = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current_weather=true&timezone=auto&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&city=${city}`);
      const data = await response.json();
      setWeatherData(data.current_weather);
      setError(null);
    } catch (error) {
      setError('An error occurred. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    // Optional: Fetch weather data for a default city on component mount
    // fetchWeatherData('London'); // Example
  }, []); // Empty dependency array to run only once

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
        <button type="submit" className="btn btn-primary">
          Get Weather
        </button>
      </form>
      {error && <p className="error text-center mt-4">{error}</p>}
      {isLoading && <p className="text-center mt-4">Loading weather data...</p>}
      {weatherData && (
        <div className="weather-info card mx-auto mt-4">
          <div className="card-header">
            <h2>Weather for {weatherData.city_name}</h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Temperature: {weatherData.temperature}°C
            </li>
            <li className="list-group-item">Humidity: {weatherData.relativehumidity}%</li>
            <li className="list-group-item">Wind Speed: {weatherData.windspeed} km/h</li>
            <li className="list-group-item">Weather: {weatherData.weathercode}</li>
            {/* Check for additional data and display accordingly */}
            {weatherData.precipitation && (
              <li className="list-group-item">Precipitation: {weatherData.precipitation} mm</li>
            )}
            {weatherData.feelslike && (
              <li className="list-group-item">Feels Like: {weatherData.feelslike}°C</li>
            )}
            {/* You can add more weather data elements here */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;