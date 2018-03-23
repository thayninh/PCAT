import React, { Component } from 'react';
import './App.css';
import Upload from './components/Upload'

class App extends Component {
  render(){
    return(
      <div>
        <div id="pcat">
          <br/>
          <Upload />
        </div>
        <div id="potree_render_area"></div>
        <div id="potree_sidebar_container"> </div>
      </div>
      
    );
  }
}

export default App;
