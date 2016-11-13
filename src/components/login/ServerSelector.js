import React, {Component} from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

class ServerSelector extends Component {
  constructor() {
    super();

    this.state = ({
      availableServers: null,
      selectedServer: null,
    });

    const discoveryUrl = "/homework/api/providers.json";

    fetch(discoveryUrl).then(r => r.json())
      .then(availableServers => {
        this.setState({
          availableServers: availableServers.servers,
        });
      })
      .catch(e => console.log("error: " + e));

    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
  };

  handleDropdownSelect(serverIndex, event) {
    this.setState({
      selectedServer: this.state.availableServers[serverIndex],
    });
  }

  handleSelectClick(event) {
    event.preventDefault();

    if (this.state.selectedServer != null) {
      this.props.onSelect(this.state.selectedServer);
    }
  }

  render() {
    if (this.state.availableServers == null) {
      return (
        <h3>Loading...</h3>
      );
    } else {
      const menuItems = this.state.availableServers.map((server, i) => {
        return (
          <MenuItem eventKey={i} key={i}>{server.name}</MenuItem>
        );
      });

      const title = this.state.selectedServer ?
        this.state.selectedServer.name :
        "Server auswählen";

      return (
        <div>
          <DropdownButton id="dropdown-server-select"
              title={title}
              onSelect={(eK, e) => this.handleDropdownSelect(eK, e)}>
            {menuItems}
          </DropdownButton>
          <Button onClick={e => this.handleSelectClick(e)}>Auswählen</Button>
        </div>
      );
    }
  }
}

export default ServerSelector;