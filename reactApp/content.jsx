import React,{Component} from 'react';

export default class Content extends Component {
 
   	render() {
   		console.log(this.props)
      	return (
        <div>
            <p>{this.props.myNumber}</p>
        </div>);
   	}

}