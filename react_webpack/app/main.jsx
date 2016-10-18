'use strict';
 
import React from "react";
import AboutUs from "./about.jsx";
import ReactDOM from "react-dom";


function bootstrap(){
    var initialState = window.list;
    ReactDOM.render(<AboutUs initialState={initialState} />,document.getElementById('app'));
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}