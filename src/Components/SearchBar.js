import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity(""); // Clear the input field after search
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" margin="20px">
      <TextField
        variant="outlined"
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
