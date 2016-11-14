'use strict';
import WeatherApp from "../../../shared/chunk/index/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

function bootstrap(){
    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
        ReactDOM.render(<WeatherApp initialState={initialState} />,document.getElementById('weather'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}