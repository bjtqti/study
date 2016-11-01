import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducer.jsx';
import BarkMessage from './bark-message.jsx';
import BarkButton from './bark-button.jsx';

const store = createStore(combineReducers({
  	dog: dogReducer,
}));

function bootstrap(){
    //var initialState = window.list;
    ReactDOM.render(
		<Provider store={store}>
		    <div>
		      	<BarkMessage />
      			<BarkButton />
		    </div>
		</Provider>, document.querySelector('#app')
	);
}

if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}