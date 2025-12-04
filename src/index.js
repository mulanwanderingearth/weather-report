"use strict"

const state = {
    temp: 78,
}
const clickTempContainer = document.querySelector("#tempValue");
const updateLandscapeContainer = document.getElementById("landscape");

const addTemp = () => {
    state.temp += 1;
    clickTempContainer.textContent = state.temp;
}

const decreaseTemp = () => {
    state.temp -= 1;
    clickTempContainer.textContent = state.temp;
}

const changeColor = () => {
    if (state.temp >= 80) {
        clickTempContainer.style.backgroundColor = "red";
        updateLandscapeContainer.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temp>=70 && state.temp <= 79) {
         clickTempContainer.style.backgroundColor = "orange";
         updateLandscapeContainer.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }else if (state.temp>=60 && state.temp <= 69) {
         clickTempContainer.style.backgroundColor = "yellow";
          updateLandscapeContainer.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }else if(state.temp>=50 && state.temp <= 59) {
         clickTempContainer.style.backgroundColor = "green";
          updateLandscapeContainer.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }else {
         clickTempContainer.style.backgroundColor = "teal";
          
    }
};

const updateCity = () => {
    let cityValue = document.getElementById('cityNameInput').value;
    if (cityValue){
        document.getElementById('headerCityName').textContent = cityValue;
    }else {
        document.getElementById('headerCityName').textContent = '';

    }
}

const registerEventHandlers = () => {
    const addTempretureButton = document.querySelector('#increaseTempControl');
    addTempretureButton.addEventListener('click', addTemp);
    addTempretureButton.addEventListener('click', changeColor);
    const decreaseTempretureButton = document.querySelector('#decreaseTempControl');
    decreaseTempretureButton.addEventListener('click', decreaseTemp);
    decreaseTempretureButton.addEventListener('click', changeColor);
    const cityInput = document.getElementById('cityNameInput');
    cityInput.addEventListener('input', updateCity)

}

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const axios = require('axios');
const dotEnv =require('dotenv');

dotEnv.config();
const locationApiKey = process.env.LOCATION_KEY;
const weatherApiKey = process.env.WEATHER_KEY;

const getWeatherFromLocation = (query) => {
    findLatitudeAndLongitude(query)
    .then((response) => {
        getWeather(response.latitude, response.long);
    })
    .catch((error) => {
        console.log('error fetching loction from query')
    })
};

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  return axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: locationApiKey,
        q: query,
        format: 'json'
      }
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);

      return {latitude, longitude}; // Return the data we want to pass on
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
      // console.log(error); // If we want to see more info about the issue
    });
};

const getWeather = (latitude,longitude) =>{
    return axios.get('https://api.openweathermap.org/data/2.5/onecall',
        {
            params: {
                appid: weatherApiKey,
                format: 'json',
                lat: latitude,
                lon: longitude
            }
        })
        .then((response) => {
            console.log(response.current.temp);
            return response
        })
    )
    
}