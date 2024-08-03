const express = require('express');
const router = express.Router();
const { getWeather, getHistoricalWeather } = require('../services/weatherService');

router.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City is required');
  }

  try {
    const data = await getWeather(city);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching current weather data. Please try again later.');
  }
});

router.get('/weather/historical', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).send('Latitude and Longitude are required');
  }

  try {
    const data = await getHistoricalWeather(lat, lon);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching historical weather data. Please try again later.');
  }
});

module.exports = router;
