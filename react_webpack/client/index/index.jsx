"use strict";
import "./index.css"
import React from 'react'
import ReactDOM from "react-dom"
import Index from './part.jsx';
 

if (module.hot) {
    module.hot.accept()
}


	let initialState = {a:1}
 	ReactDOM.render(
      <Index initialState={initialState} />,
      document.getElementById('app'))
  
 