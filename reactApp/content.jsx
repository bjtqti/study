import React,{Component} from 'react';

export default class Content extends Component {
	constructor(props) {
		super(props);
	};

	componentWillMount() {
		console.log('Component WILL MOUNT!')
	}

	componentDidMount() {
		console.log('Component DID MOUNT!')
	}

	componentWillReceiveProps(newProps) {
		console.log('Component WILL RECIEVE PROPS!',newProps)
	}

	shouldComponentUpdate(newProps, newState) {
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('Component WILL UPDATE!');
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('Component DID UPDATE!')
	}

	componentWillUnmount() {
		console.log('Component WILL UNMOUNT!')
	}

   	render() {
      	return (
        <div>
            <h4>Random number: {Math.random()}</h4>
            <p>{this.props.myNumber}</p>
        </div>);
   	}

}