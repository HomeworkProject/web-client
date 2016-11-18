import React, {Component} from 'react';
import {Col, ControlLabel, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import * as Util from '../../Util.js';

class GroupSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: null,
      selectedGroup: null,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  loadGroups() {
    if (this.state.loading) return;

    this.setState({
      loading: true
    });

    const requestParameters = {
      server: this.props.server.address,
      port: this.props.server.port
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
          groups: data,
          loading: false
        });
      }).catch(e => console.log("error: " + e));
  }

  handleChange(event) {
    let group;
    if (event.target.value === "none") {
      group = null;
    } else {
      group = event.target.value;
    }

    this.setState({
      selectedGroup: group
    });

    this.props.onSelect(group);
  }

  render() {
    let dropdownDisabled;

    const options = this.state.groups ? this.state.groups.map(group => {
      return (
        <option key={group} value={group}>{group}</option>
      );
    }) : [];
    options.unshift(<option key="none" value="none"> </option>);

    if (this.state.groups == null && this.props.server != null) {
      this.loadGroups();
    }

    dropdownDisabled = !(this.state.groups != null && this.props.enabled);

    const refreshGlyphicon = this.state.loading ?
      <Glyphicon className="loading-icon" glyph="refresh" /> : null;

    return (
      <FormGroup controlId="group-select">
        <Col componentClass={ControlLabel} sm={2}>
          Klasse:
          {refreshGlyphicon}
        </Col>
        <Col sm={8}>
          <FormControl componentClass="select"
                       disabled={dropdownDisabled}
                       onChange={this.handleChange}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
}

export default GroupSelector;