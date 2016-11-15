'use strict';
import expect from "expect";
import * as actions from "../../../shared/chunk/index/action.es6";
import * as constants from "../../../shared/chunk/index/constant.es6";
import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

describe("actions",()=>{
    it("should create changeField action",()=>{
        let name = "city",value = "深圳";
        let expectedAction = {
            type:constants.CHANGE_FIELD,
            name:"city",
            value:"深圳"
        }
        expect(actions.changeField(name,value)).toEqual(expectedAction);
    })
    describe("action fetchWeather",()=>{
        var mockStore,fakeServer;

        beforeEach(()=>{
            mockStore = configureStore([thunkMiddleware]);
            fakeServer = sinon.fakeServer.create({autoRespond:true,autoRespondAfter:200})
        })
        afterEach(()=>{
            fakeServer.restore();
        })
        it("should RESPONSE_WEATHER when fetched",(done)=>{
            let ret = {
                "weatherFetched":true,
                "result":{"city":"shenzhen"}
            };
            let initialState = {
                weatherByCityName:{weather:{}}
            }
            fakeServer.respondWith("POST", "/weather",
            [200, { "Content-Type": "application/json" },JSON.stringify(ret)]);
            // var callback = sinon.spy();
            // apiRequest("/weather").then(callback)
            // fakeServer.respond();
            // sinon.assert.calledWith(callback, {weatherFetched:true});
            // fetchMock.mock("^/weather",{
            //     status:200,body:ret
            // })
            let expectedActions = [
                {type:constants.REQUEST_WEATHER,param:{city:"深圳"}},
                {type:constants.RESPONSE_WEATHER,param:{city:"深圳"},res:ret}
            ]
            let store = mockStore(initialState,expectedActions,done);
            store.dispatch(actions.fetchWeather({city:"深圳"}))     
        })
    })
})

