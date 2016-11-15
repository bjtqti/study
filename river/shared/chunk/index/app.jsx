'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Weather from "./component.jsx";
import * as actions from "./action.es6";

let WeatherConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Weather,actions));

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
        module.hot.accept('./reducer.es6', () => {
            const nextRootReducer = require('./reducer.es6');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store
}

class WeatherApp extends Component{
    render(){
        const {weather} = this.props.initialState;
        const initialState = {
            weatherByCityName:{
                weather
            }
        }
        const store = configureStore(initialState);
        return (
            <Provider store={store}>
            <WeatherConnected/>
            </Provider>
        )
    }
}

export default WeatherApp;