import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import './LoginPage.css';
import ServerSelector from './ServerSelector.js';
import GroupSelector from './GroupSelector.js';
import UserPasswordSelector from './UserPasswordSelect.js';
import * as Util from '../../Util.js';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      server: null,
      group: null,
      user: null,
      password: null,
      tryingLogin: null,
      loginResult: false,
    };

    this.handleServerSelect = this.handleServerSelect.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const storedServer = JSON.parse(localStorage.getItem("server"));
    if (storedServer != null) {
      // Try a login, there could still be a cookie with a valid token around
      const requestParameters = {
        server: storedServer.address,
        port: storedServer.port,
      };
      fetch("/homework/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: Util.makeRequestBody(requestParameters),
        credentials: "include"
      }).then(r => r.json())
        .then(data => {
          if (data.status === "logged_in") {
            this.props.onLogin(storedServer);
          }
        }).catch(e => console.log("error: " + e));
    }
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

    const requestParameters = {
      server: this.state.server.address,
      port: this.state.server.port,
      group: this.state.group,
      user: this.state.user,
      password: this.state.password
    };

    this.setState({
      tryingLogin: true,
      loginResult: null
    });

    fetch("/homework/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Util.makeRequestBody(requestParameters),
      credentials: "include"
    }).then(r => r.json())
      .then(data => {
        this.setState({
          tryingLogin: false,
          loginResult: data.status,
        });
        if (data.status === "logged_in") {
          localStorage.setItem("server", JSON.stringify(this.state.server));
          this.props.onLogin(this.state.server);
        }
      }).catch(e => console.log("error: " + e));

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
                                passwordValid={this.state.loginResult !== "invalid_credentials"}
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
