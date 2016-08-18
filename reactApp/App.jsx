import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

class Header extends React.Component {
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

class Content extends React.Component {
   render() {
      return (
         <div>
            <h2 className="new-title">Content</h2>
            <p>The content text!!!</p>
         </div>
      );
   }
}

export default App;