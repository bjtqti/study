import React,{Component} from 'react';
export default class Header extends Component {
   render() {
  	var title = {
  		color:'red'
  	};
      return (
         <div>
            <h1 style={title}>Header</h1>
         </div>
      );
   }
}