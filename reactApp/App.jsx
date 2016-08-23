import React,{Component} from 'react';
import Header from './header.jsx';
import Content from './content.jsx';

class App extends Component {
	constructor() {
		super();

		this.state = {
			data: []
		}
		this.setStateHandler = this.setStateHandler.bind(this);
	};
	setStateHandler() {
		var item = "setState..."
		var myArray = this.state.data;
		myArray.push(item)
		this.setState({
			data: myArray
		})
	};
    render() {
      return (
         <div>
            <Header/>
            <h4>In this tutorial we will explain React component API</h4>
            <Content myNumber = {this.state.data}></Content>
            <button onClick = {this.setStateHandler}>SET STATE</button>
         </div>
      );
   }
}

export default App;