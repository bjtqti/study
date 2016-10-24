'use strict'
import React,{Component} from "react";

class AboutUs extends Component{
	constructor(props){
		super(props);
        this.state = {
            maskActive:false,
            pageIndex:1
        }
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
        var pageIndex = this.state.pageIndex+1;
        this.setState({
            pageIndex,
            maskActive:true
        });
	}
	memuList(){
    	let list = this.props.initialState||[];
		return list.map((item,i)=>{
			return (<li key={'i-'+i} onClick={this.handleClick}>{item.name}</li>)
		});
	}
    render(){
        const {pageIndex,maskActive} = this.state;
        let maxlength = Math.min(pageIndex * 10,window.innerWidth);
        let proces = {width:(maxlength) + 'px','textIndent':maxlength+'px'};
        return (
            <div className="aboutus-content">
                <h3>
                    <span className="title">关于我们</span>
                </h3>
                <ul>
                	{this.memuList()}
                </ul>
                <div className="process">
                    <div style={proces}>{maxlength}</div>
                </div>
                <footer>
                    copyright@2014-2016 湖南长沙互联网家
                </footer>
            </div>
        )
    }
}

export default AboutUs;