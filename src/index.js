"use strict"
// const axios = require('axios');
const state = {
    temp: 10,
}

const addTemp = () => {
    const clickTempContainer = document.querySelector('#tempValue');
    state.temp += 1;
    clickTempContainer.textContent = state.temp;
}

const decreaseTemp = () => {
    const clickTempContainer = document.querySelector('#tempValue');
    state.temp -= 1;
    clickTempContainer.textContent = state.temp;
}

const registerEventHandlers = () => {
    const addTempretureButton = document.querySelector('#increaseTempControl');
    addTempretureButton.addEventListener('click', addTemp);
    const decreaseTempretureButton = document.querySelector('#decreaseTempControl');
    decreaseTempretureButton.addEventListener('click', decreaseTemp);
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
