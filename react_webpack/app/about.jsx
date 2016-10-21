'use strict'
import React,{Component} from "react";

class AboutUs extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		console.log(this)
	}
	memuList(){
    	let list = this.props.initialState||[];
		return list.map((item,i)=>{
			return (<li key={'i-'+i} onClick={this.handleClick}>{item.name}</li>)
		});
	}
    render(){
        return (
            <div className="aboutus-content">
                <h3>
                    <span className="title">关于我们</span>
                </h3>
                <ul>
                	{this.memuList()}
                </ul>
                <footer>
                    copyright@2014-2016 湖南长沙互联网家
                </footer>
            </div>
        )
    }
}

export default AboutUs;