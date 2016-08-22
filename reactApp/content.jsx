import React,{Component} from 'react';

export default class Content extends Component {
 
   	render() {
   		console.log(this.props)
      	return (
        <div>
            <p>我是p标签{this.props.myNumber}</p>
            <a>我是a标签{this.props.myNumber}</a>
            <div>我是div标签{this.props.myNumber}</div>
            <div>
            	<p>我是div标签里边的p标签{this.props.myNumber}</p>
            	<p><a>我是div标签里边的p标签里边的a标签{this.props.myNumber}</a></p>
            </div>
        </div>);
   	}

}