import { connect } from 'react-redux';
import Button from './components/button.jsx';
import { makeBark } from './actions/action.jsx';
const mapDispatchToProps = dispatch => ({
  	action: () => { 
  		dispatch(makeBark());
  	},
  	actionLabel: 'Bark',
});

export default connect(null, mapDispatchToProps)(Button);