import React, {Component} from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
import * as Util from '../../Util.js';

class GroupSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: null,
      selectedGroup: null,
    };

    const requestParameters = {
      server: props.server.address,
      port: props.server.port
    };

    fetch("/homework/api/groups.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Util.makeRequestBody(requestParameters)
    }).then(r => r.json())
      .then(data => {
        this.setState({
          groups: data
        });
      }).catch(e => console.log("error: " + e));
  }

  handleDropdownSelect(group, event) {
    this.setState({
      selectedGroup: group
    });
  }

  handleSelectClick(event) {
    event.preventDefault();

    this.props.onSelect(this.state.selectedGroup);
  }

  render() {
    let content;
    if (this.state.groups == null) {
      content = (
        <h3>Loading...</h3>
      );
    } else {
      const menuItems = this.state.groups.map(group => {
        return (
          <MenuItem eventKey={group} key={group}>{group}</MenuItem>
        );
      });

      content = (
        <div>
          <h3>Gruppe auswählen:</h3>
          <DropdownButton id="dropdown-group-select"
                          title={this.state.selectedGroup || "Gruppe auswählen"}
                          onSelect={(eK, e) => this.handleDropdownSelect(eK, e)}>
            {menuItems}
          </DropdownButton>
          <Button onClick={e => this.handleSelectClick(e)}>Auswählen</Button>
        </div>
      );
    }

    return (
      <div>
        <h4>Server: {this.props.server.name}</h4>
        {content}
      </div>
    );
  }
}

export default GroupSelector;