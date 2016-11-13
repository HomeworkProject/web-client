import React, {Component} from 'react';
import ServerSelector from './ServerSelector.js';
import GroupSelector from './GroupSelector.js';
import UserPasswordSelector from './UserPasswordSelect.js';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      server: null,
      group: null,
      "user": "",
      "password": "",
    };

    this.handleServerSelect = this.handleServerSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleServerSelect(server) {
    this.setState({
      server: server
    });
  }

  handleGroupSelect(group) {
    this.setState({
      group: group
    });
  }

  handleChange(element, event) {
    const stateChange = {};
    stateChange[element] = event.target.value;
    this.setState(stateChange);
  }

  handleLogin(user, password) {
    // TODO: Check if credentials are valid

    const credentials = {
      server: this.state.server,
      group: this.state.group,
      user: user,
      password: password
    };

    this.props.onLogin(credentials);
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
    if (this.state.server == null) {
      return (
        <ServerSelector onSelect={s => this.handleServerSelect(s)}/>
      );
    } else if (this.state.group == null) {
      return (
        <GroupSelector server={this.state.server}
                       onSelect={g => this.handleGroupSelect(g)}/>
      );
    } else {
      return (
        <UserPasswordSelector server={this.state.server}
                            group={this.state.group}
                            onSelect={(u, p) => this.handleLogin(u, p)} />
      );
    }

    /*return (
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
    );*/
  }
}

export default LoginPage;
