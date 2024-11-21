import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button, Box } from "@mui/material";

const WeatherComponent = ({ weatherData, city }) => {
  const [showHourly, setShowHourly] = useState(false); // State to toggle hourly temperature

  if (!weatherData) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        Enter a city to see the weather!
      </Typography>
    );
  }

  const { daily, hourly } = weatherData;

  const toggleHourly = () => {
    setShowHourly(!showHourly); // Toggle the hourly data visibility
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Card
        style={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: "bold", color: "#3f51b5" }}
          >
            Weather in {city}
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Max Temperature:
              </Typography>
              <Typography variant="h6">{daily.temperature_2m_max[0]}°C</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Min Temperature:
              </Typography>
              <Typography variant="h6">{daily.temperature_2m_min[0]}°C</Typography>
            </Grid>
          </Grid>

          {/* Button to Toggle Hourly Temperature */}
          <Box textAlign="center" marginTop="20px">
            <Button
              variant="contained"
              color={showHourly ? "secondary" : "primary"}
              onClick={toggleHourly}
              style={{ borderRadius: "20px", padding: "10px 20px" }}
            >
              {showHourly ? "Hide Hourly Temperature" : "Show Hourly Temperature"}
            </Button>
          </Box>

          {/* Hourly Temperature Section */}
          {showHourly && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                background: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                maxHeight: "250px",
                overflowY: "auto",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "#3f51b5", marginBottom: "10px" }}
              >
                Hourly Temperature:
              </Typography>
              {hourly.temperature_2m.slice(0, 12).map((temp, index) => (
                <Typography key={index} variant="body2" style={{ padding: "5px 0" }}>
                  {hourly.time[index]}: {temp}°C
                </Typography>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherComponent;
