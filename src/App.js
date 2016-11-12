import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HomeworkContainer from './components/HomeworkContainer.js';
import LoginPage from './components/LoginPage.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      credentials: null,
    };

    this.handleLogin.bind(this);
  }

  handleLogin(credentials) {
    this.setState({
      credentials: credentials
    });
  }

  render() {
    let content;
    if (this.state.credentials == null) {
      content = <LoginPage onLogin={c => this.handleLogin(c)}/>;
    } else {
      content = <HomeworkContainer credentials={this.state.credentials}/>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Hausaufgaben</h2>
        </div>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default App;
