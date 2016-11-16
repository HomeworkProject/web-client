import React, {Component} from 'react';
import './App.css';
import HomeworkContainer from './components/HomeworkContainer.js';
import LoginPage from './components/login/LoginPage.js';

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
