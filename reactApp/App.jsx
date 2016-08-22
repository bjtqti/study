import React,{Component} from 'react';
import Header from './header.jsx';
import Content from './content.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: 0
		}
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
	};
	forceUpdateHandler() {
		this.setState({
			data:Math.random()
		})
		//this.forceUpdate();
	};
   render() {
      return (
         <div>
            <Header/>
            <h4>Random number: {this.state.data}</h4>
            <Content myNumber = {this.state.data}></Content>
            <button onClick = {this.forceUpdateHandler}>FORCE UPDATE</button>
         </div>
      );
   }
}

export default App;