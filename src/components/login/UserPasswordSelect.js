import React, {Component} from 'react';
import {Col, ControlLabel, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import * as Util from '../../Util.js';

class UserPasswordSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableUsers: null,
      selectedUser: null,
      password: "",
      loading: false,
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  loadUsers() {
    if (this.state.loading) return;
    this.setState({
      loading: true
    });

    const requestParameters = {
      server: this.props.server.address,
      port: this.props.server.port,
      group: this.props.group
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
          availableUsers: data,
          loading: false
        });
      })
      .catch(e => console.log("error: " + e));
  }

  handleUserChange(event) {
    let user;
    if (event.target.value === "none") {
      user = null;
    } else {
      user = event.target.value;
    }

    this.setState({
      selectedUser: user
    });

    this.props.onUserSelect(user);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });

    this.props.onPasswordChange(event.target.value);
  }

  render() {
    let dropdownDisabled;

    const options = this.state.availableUsers ? this.state.availableUsers.map(user => {
      return (
        <option key={user} value={user}>{user}</option>
      );
    }) : [];

    options.unshift(<option key="none" value="none"></option>);

    if (this.props.group != null && this.state.availableUsers == null) {
      this.loadUsers();
    }

    dropdownDisabled = !(this.state.availableUsers != null && this.props.enabled);

    const refreshGlyphicon = this.state.loading ?
      <Glyphicon className="loading-icon" glyph="refresh"/> : null;

    return (
      <div>
        <FormGroup controlId="user-select">
          <Col componentClass={ControlLabel} sm={2}>
            Benutzer:
            {refreshGlyphicon}
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select"
                         onChange={this.handleUserChange}
                         disabled={dropdownDisabled}>
              {options}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="password-input">
          <Col componentClass={ControlLabel} sm={2}>
            Passwort:
          </Col>
          <Col sm={8}>
            <FormControl type="password"
                         onChange={this.handlePasswordChange}/>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default UserPasswordSelect;