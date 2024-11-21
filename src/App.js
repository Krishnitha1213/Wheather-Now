import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherComponent from "./Components/WeatherComponent";
import { Typography } from "@mui/material";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null); // State for error messages

  const fetchWeather = (cityName) => {
    // Clear previous states
    setError(null);
    setWeatherData(null);
    setCity("");

    const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

    axios
      .get(geoApiUrl)
      .then((geoResponse) => {
        const results = geoResponse.data.results;

        if (results && results.length > 0) {
          const { latitude, longitude, name } = results[0];
          setCity(name); // Set the valid city name
          const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
          return axios.get(weatherApiUrl);
        } else {
          throw new Error("City not found. Please enter a valid city name.");
        }
      })
      .then((weatherResponse) => {
        setWeatherData(weatherResponse.data); // Set weather data
      })
      .catch((error) => {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred. Please try again."
        );
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div>
      <SearchBar onSearch={fetchWeather} />
      {error && (
        <Typography
          variant="h6"
          align="center"
          color="error"
          style={{ marginTop: "20px" }}
        >
          {error}
        </Typography>
      )}
      {!error && city && !weatherData && (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          style={{ marginTop: "20px" }}
        >
          Loading weather data for {city}...
        </Typography>
      )}
      <WeatherComponent weatherData={weatherData} city={city} />
    </div>
  );
};

export default App;
