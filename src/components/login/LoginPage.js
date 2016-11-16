import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import './LoginPage.css';
import ServerSelector from './ServerSelector.js';
import GroupSelector from './GroupSelector.js';
import UserPasswordSelector from './UserPasswordSelect.js';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      server: null,
      group: null,
      user: null,
      password: null,
    };

    this.handleServerSelect = this.handleServerSelect.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  handleUserSelect(value) {
    this.setState({
      user: value
    });
  }

  handlePasswordChange(value) {
    this.setState({
      password: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO: Check if credentials are valid

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
      <div className="login">
        <h2 className="login-heading">Login</h2>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <ServerSelector onSelect={s => this.handleServerSelect(s)}/>
          <GroupSelector enabled={this.state.server != null}
                         server={this.state.server}
                         onSelect={g => this.handleGroupSelect(g)}/>
          <UserPasswordSelector enabled={this.state.group != null}
                                server={this.state.server}
                                group={this.state.group}
                                onUserSelect={u => this.handleUserSelect(u)}
                                onPasswordChange={v => this.handlePasswordChange(v)}/>
          <Button type="submit">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

export default LoginPage;
