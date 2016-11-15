'use strict'
import React,{Component} from "react";
import classNames from "classnames";

class Weather extends Component{
    handleChange(e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField("city",e.target.value);
    }
    handleQuery(e){
        e && e.preventDefault();
        const {fetchWeather} = this.props;
        const {weather} = this.props.weatherByCityName;
        fetchWeather({
            cityname:weather.city
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.weatherByCityName.weatherFetching === false && 
            this.props.weatherByCityName.weatherFetching === true){
            if(nextProps.weatherByCityName.weatherFetched === true){
                alert("fetch success!");
            }else{
                alert(nextProps.errMsg);
            }
        }
    }
    render(){
        const {weather} = this.props.weatherByCityName;
        const classes = classNames({
            "weather-content":true
        })
        return (
            <div className={classes}>
                <h3>Weather</h3>
                <div className="weather-form">
                    <input type="text" name="cityname" value={weather.city} onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleQuery.bind(this)}>Query</button>
                    <p><label>City:</label><span>{weather.pinyin}</span></p>
                    <p><label>Date:</label><span>{weather.date}</span></p>
                    <p><label>Postcode:</label><span>{weather.postCode}</span></p>
                    <p><label>Sunrise:</label><span>{weather.sunrise}</span></p>
                    <p><label>Sunset:</label><span>{weather.sunset}</span></p>
                    <p><label>Coordinate:</label><span>{weather.longitude}/{weather.latitude}</span></p>
                    <p><label>Weather:</label><span>{weather.weather}</span></p>
                </div>
            </div>
        )
    }
}

export default Weather;