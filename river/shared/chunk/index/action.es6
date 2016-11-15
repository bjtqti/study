'use strict';
import {apiRequest} from "../../lib/util.es6";
import {CHANGE_FIELD,REQUEST_WEATHER,RESPONSE_WEATHER,FAIL_RESPONSE} from "./constant.es6";
export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function requestWeather(param){
    return {
        type:REQUEST_WEATHER,
        param
    }
}

function responseWeather(param,res){
    return {
        type:RESPONSE_WEATHER,
        param,
        res
    }
}
function failResponse(err){
    return {
        type:FAIL_RESPONSE,
        err
    }
}

export function fetchWeather(param){
    return (dispatch)=>{
        dispatch(requestWeather(param));
        apiRequest("/weather",param,{method:"POST"}).then((res)=>{
            dispatch(responseWeather(param,res));
        }).catch((err)=>{
            dispatch(failResponse(err));
        })
    }
}