"use strict"

const state = {
    temp: 78,
    city: 'Seattle',
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
    } else if (state.temp >= 70 && state.temp <= 79) {
        clickTempContainer.style.backgroundColor = "orange";
        updateLandscapeContainer.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (state.temp >= 60 && state.temp <= 69) {
        clickTempContainer.style.backgroundColor = "yellow";
        updateLandscapeContainer.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (state.temp >= 50 && state.temp <= 59) {
        clickTempContainer.style.backgroundColor = "green";
        updateLandscapeContainer.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        clickTempContainer.style.backgroundColor = "teal";
    }
};

const updateCity = () => {
    let cityValue = document.getElementById('cityNameInput').value;
    state.city = cityValue;
    if (cityValue) {
        document.getElementById('headerCityName').textContent = cityValue;
    } else {
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
    cityInput.addEventListener('input', updateCity);
    const realTimeTempButton =document.getElementById('currentTempButton');
    realTimeTempButton.addEventListener('click', () => getWeatherFromLocation(state.city));
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const getWeatherFromLocation = (query) => {
    return findLatitudeAndLongitude(query)
        .then((response) => {
            return getWeather(response.latitude, response.longitude);
        })
        .catch((error) => {
            console.log('error fetching loction from query')
        })
};

const findLatitudeAndLongitude = (query) => {
    let latitude, longitude;
    return axios.get('http://127.0.0.1:5000/location', {
        params: {
            q: query
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
            const tempK = response.data.main.temp;
            const tempF =  ( tempK - 273.15) * (9 / 5) + 32;
            state.temp = Math.round(tempF);
            clickTempContainer.textContent = state.temp;
            changeColor();
            return state.temp;
        })
        .catch((error) => {
            return error;
        });
};
