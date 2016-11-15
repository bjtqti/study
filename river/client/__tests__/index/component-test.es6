'use strict';
import expect from "expect";
import React from "react";
import ReactTestUtils from "react/lib/ReactTestUtils";
import Weather from "../../../shared/chunk/index/component.jsx";

describe("index component", function() {
    describe("weather",()=>{
        let props,weatherComponent,input,button;
        beforeEach(()=>{
            let initialState = window.__initialstate__['index/initialstate']
            props = {
                changeField:expect.createSpy(),
                fetchWeather:expect.createSpy(),
                weatherByCityName:initialState
            }
            weatherComponent = ReactTestUtils.renderIntoDocument(
                <Weather {...props}/>
            );
            input = ReactTestUtils.findRenderedDOMComponentWithTag(
                weatherComponent,"input"
            )
            button = ReactTestUtils.findRenderedDOMComponentWithTag(
                weatherComponent,"button"
            )
            // expect.spyOn(props,"fetchWeather")
        })
        afterEach(()=>{
            expect.restoreSpies();
        })
        it("should render correct",()=>{
            expect(input.value).toBe("长沙");
            expect(button.nextSibling.lastChild.textContent).toBe("changsha")
        })
        it("should call handleQuery with input value",()=>{
            input.value = "上海";
            ReactTestUtils.Simulate.change(input);
            ReactTestUtils.Simulate.click(button);
            expect(props.fetchWeather.calls.length).toBe(1)
        })
    })
});