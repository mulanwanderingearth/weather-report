"use strict"
// const axios = require('axios');
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

const registerEventHandlers = () => {
    const addTempretureButton = document.querySelector('#increaseTempControl');
    addTempretureButton.addEventListener('click', addTemp);
    addTempretureButton.addEventListener('click', changeColor);
    const decreaseTempretureButton = document.querySelector('#decreaseTempControl');
    decreaseTempretureButton.addEventListener('click', decreaseTemp);
    decreaseTempretureButton.addEventListener('click', changeColor);

}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
