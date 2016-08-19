import React,{Component} from 'react';
import Header from './header.jsx';
import Content from './content.jsx';

class App extends Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

export default App;