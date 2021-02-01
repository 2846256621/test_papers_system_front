
import React, { Component } from 'react';
import RouteMap from './routers/route.jsx';
import '../node_modules/antd/dist/antd.css';
class App extends Component {
  render() {
    return (
      <div id="App">
        <RouteMap/>
      </div>
    );
  }
}
export default App;