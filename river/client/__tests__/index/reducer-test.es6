'use strict';
import expect from "expect";
import * as reducers from "../../../shared/chunk/index/reducer.es6";
import * as constants from "../../../shared/chunk/index/constant.es6";

describe("reducers",()=>{
    var initialState;
    beforeEach(()=>{
        initialState = {
            weatherByCityName:window.__initialstate__['index/initialstate']
        }
    })
    describe("weatherByCityName",()=>{
        it("should handle CHANGE_FIELD",()=>{
            let action = {
                type:constants.CHANGE_FIELD,
                name:"city",
                value:"深圳"
            }
            let nextState = reducers.weatherByCityName(initialState.weatherByCityName,action);
            expect(nextState.weather['city']).toBe("深圳");
        })
        it("should handle RESPONSE_WEATHER",()=>{
            let action = {
                type:constants.RESPONSE_WEATHER,
                param:{city:"深圳"},
                res:{result:{pinyin:"shenzhen"}}
            }
            let nextState = reducers.weatherByCityName(initialState.weatherByCityName,action);
            expect(nextState.weather.pinyin).toEqual("shenzhen")
        })
    })
})