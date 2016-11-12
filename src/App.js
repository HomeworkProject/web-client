import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HomeworkContainer from './components/HomeworkContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Hausaufgaben</h2>
        </div>
        <div>
          <HomeworkContainer />
        </div>
      </div>
    );
  }
}

export default App;
