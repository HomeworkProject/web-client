import React, {Component} from 'react';
import './App.css';
import MainPage from './components/MainPage.js';
import LoginPage from './components/login/LoginPage.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      server: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(server) {
    this.setState({
      server: server
    });
  }

  handleLogout() {
    this.setState({
      server: null
    });
  }

  render() {
    let content;
    if (this.state.server === null) {
      content = <LoginPage onLogin={this.handleLogin}/>;
    } else {
      content = <MainPage server={this.state.server}
                          onLogout={this.handleLogout}/>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>Hausaufgaben</h1>
        </div>
        <div className="App-content">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
