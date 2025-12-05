'use strict';

const state = {
  temp: 78,
};
const clickTempContainer = document.querySelector('#tempValue');
const updateLandscapeContainer = document.getElementById('landscape');

const addTemp = () => {
  state.temp += 1;
  clickTempContainer.textContent = state.temp;
};

const decreaseTemp = () => {
  state.temp -= 1;
  clickTempContainer.textContent = state.temp;
};

const changeColor = () => {
  if (state.temp >= 80) {
    clickTempContainer.style.backgroundColor = 'red';
    updateLandscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    clickTempContainer.style.backgroundColor = 'orange';
    updateLandscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    clickTempContainer.style.backgroundColor = 'yellow';
    updateLandscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    clickTempContainer.style.backgroundColor = 'green';
    updateLandscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    clickTempContainer.style.backgroundColor = 'teal';

  }
};

const updateCity = () => {
  let cityValue = document.getElementById('cityNameInput').value;
  if (cityValue) {
    document.getElementById('headerCityName').textContent = cityValue;
  } else {
    document.getElementById('headerCityName').textContent = '';
  }
  return cityValue;
};

const handleGetRealTimeTemp = () => {
  const query = updateCity();
  if (!query) {
    console.warn('No city name provided');
    return;
  }
  getWeatherFromLocation(query)
    .then((weatherData) => {
      console.log('Weather data received:', weatherData);
      // Convert Kelvin to Fahrenheit
      const tempInKelvin = weatherData.main.temp;
      const tempInFahrenheit = Math.round((tempInKelvin - 273.15) * 9 / 5 + 32);

      // Update state and display
      state.temp = tempInFahrenheit;
      clickTempContainer.textContent = state.temp;
      changeColor(); // update colors/landscape based on new temp
      return state.temp;
    })
    .catch((err) => {
      console.error('Error fetching weather for', query, err);
    });
};

const registerEventHandlers = () => {
  const addTempretureButton = document.querySelector('#increaseTempControl');
  addTempretureButton.addEventListener('click', addTemp);
  addTempretureButton.addEventListener('click', changeColor);
  const decreaseTempretureButton = document.querySelector('#decreaseTempControl');
  decreaseTempretureButton.addEventListener('click', decreaseTemp);
  decreaseTempretureButton.addEventListener('click', changeColor);
  const cityInput = document.getElementById('cityNameInput');
  cityInput.addEventListener('input', updateCity);

  const cityTemperatureButton = document.getElementById('currentTempButton');
  cityTemperatureButton.addEventListener('click', handleGetRealTimeTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// const axios = require('axios');
// const dotEnv = require('dotenv');

// dotEnv.config();
// const locationApiKey = process.env.LOCATION_KEY;
// const weatherApiKey = process.env.WEATHER_KEY;

const getWeatherFromLocation = (query) => {
  return findLatitudeAndLongitude(query)
    .then((response) => {
      return getWeather(response.latitude, response.longitude);
    })
    .catch((error) => {
      console.log('error fetching location from query', error);
      throw error;
    });
};

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  return axios.get('http://127.0.0.1:5000/location',
    {
      params: {
        q: query,
      }
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);

      return { latitude, longitude };
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
      throw error;
    });
};

const getWeather = (latitude, longitude) => {
  return axios.get('http://127.0.0.1:5000/weather',
    {
      params: {
        lat: latitude,
        lon: longitude
      }
    })
    .then((response) => {
      if (response && response.data && response.data.main) {
        console.log('temperature (K):', response.data.main.temp);
      }
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};