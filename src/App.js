import React, {Component} from 'react';
import './App.css';
import HomeworkContainer from './components/HomeworkContainer.js';
import LoginPage from './components/login/LoginPage.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      server: null,
    };

    this.handleLogin.bind(this);
  }

  handleLogin(server) {
    this.setState({
      server: server
    });
  }

  render() {
    let content;
    if (this.state.server === null) {
      content = <LoginPage onLogin={s => this.handleLogin(s)}/>;
    } else {
      content = <HomeworkContainer server={this.state.server}/>;
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
