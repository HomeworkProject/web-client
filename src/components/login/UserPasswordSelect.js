import React, {Component} from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
import * as Util from '../../Util.js';

class UserPasswordSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableUsers: null,
      selectedUser: null,
      password: ""
    };

    const requestParameters = {
      server: props.server.address,
      port: props.server.port,
      group: props.group
    };

    fetch("/homework/api/users.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Util.makeRequestBody(requestParameters)
    }).then(r => r.json())
      .then(data => {
        this.setState({
          availableUsers: data
        });
      })
      .catch(e => console.log("error: " + e));
  }

  handleDropdownSelect(user, event) {
    this.setState({
      selectedUser: user
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLoginClick(event) {
    event.preventDefault();

    if (!this.state.selectedUser || !this.state.password) {
      return;
    }

    this.props.onSelect(this.state.selectedUser, this.state.password);
  }

  render() {
    let content;
    if (this.state.availableUsers == null) {
      content = (
        <h3>Loading...</h3>
      );
    } else {
      const menuItems = this.state.availableUsers.map(user => {
        return (
          <MenuItem eventKey={user} key={user}>{user}</MenuItem>
        );
      });

      content = (
        <div>
          <h3>Benutzer auswählen:</h3>
          <DropdownButton id="dropdown-user-select"
                          title={this.state.selectedUser || "Benutzer auswählen"}
                          onSelect={(eK, e) => this.handleDropdownSelect(eK, e)}>
            {menuItems}
          </DropdownButton>
          <h3>Passwort:</h3>
          <input type="password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} />
          <Button onClick={e => this.handleLoginClick(e)}>Login</Button>
        </div>
      );
    }

    return (
      <div>
        <h4>Server: {this.props.server.name}</h4>
        <h4>Gruppe: {this.props.group}</h4>
        {content}
      </div>
    );
  }
}

export default UserPasswordSelect;