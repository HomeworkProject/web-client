import React, {Component} from 'react';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      "server": "",
      "group": "",
      "user": "",
      "password": ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(element, event) {
    const stateChange = {};
    stateChange[element] = event.target.value;
    this.setState(stateChange);
  }

  handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      server: this.state.server,
      group: this.state.group,
      user: this.state.user,
      password: this.state.password
    };

    this.props.onLogin(credentials);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Server:
        <input type="text" value={this.state.server}
               onChange={(e) => this.handleChange("server", e)}/>
        Group:
        <input type="text" value={this.state.group}
               onChange={(e) => this.handleChange("group", e)}/>
        User:
        <input type="text" value={this.state.user}
               onChange={(e) => this.handleChange("user", e)}/>
        Password:
        <input type="password" value={this.state.password}
               onChange={(e) => this.handleChange("password", e)}/>

        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default LoginPage;
