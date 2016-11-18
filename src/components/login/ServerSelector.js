import React, {Component} from 'react';
import './ServerSelector.css';
import {Col, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';

class ServerSelector extends Component {
  constructor() {
    super();

    this.state = ({
      availableServers: null,
      selectedServer: null,
    });

    const discoveryUrl = "http://dev.m-lessmann.de/hwserver/providerDiscovery.json";

    fetch(discoveryUrl).then(r => r.json())
      .then(availableServers => {
        this.setState({
          availableServers: availableServers.servers,
        });
      })
      .catch(e => console.log("error: " + e));

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    let server;
    if (event.target.value === "none") {
      server = null;
    } else {
      server = this.state.availableServers[event.target.value];
    }

    this.setState({
      selectedServer: server
    });

    this.props.onSelect(server);
  }

  render() {
    const options = this.state.availableServers ? this.state.availableServers.map((server, i) => {
      return (
        <option key={i} value={i}>{server.name}</option>
      );
    }) : [];

    options.unshift(<option key="none" value="none"> </option>);

    return (
      <FormGroup controlId="server-select">
        <Col componentClass={ControlLabel} sm={2}>
          Server:
        </Col>
        <Col sm={8}>
          <FormControl componentClass="select"
                       onChange={this.handleChange}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
}

export default ServerSelector;