import React, {Component} from 'react';
import HomeworkList from './HomeworkList.js';
import DatePicker from 'react-bootstrap-date-picker';
import * as Util from '../Util.js';

class HomeworkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hwItems: null,
      loading: false,
      date: new Date().toISOString()
    };
  }

  loadHomework(dateS) {
    this.setState({
      loading: true
    });

    const date = new Date(dateS);
    const requestParameters = {
      server: this.props.server.address,
      port: this.props.server.port,
      dateY: date.getFullYear(),
      dateM: date.getMonth() + 1,
      dateD: date.getDate()
    };

    fetch("/homework/api/homework.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Util.makeRequestBody(requestParameters),
      credentials: "include"
    }).then(r => {
      return r.json();
    })
      .then(data => {
        this.setState({
          hwItems: data,
          loading: false,
        });
      })
      .catch(e => console.log("error: " + e));
  }

  handleDatePickerChange(value) {
    this.setState({date: value});

    this.loadHomework(value);
  }

  render() {
    let homework;
    if (this.state.loading) {
      homework = (
        <h3>Loading...</h3>
      );
    } else if (this.state.hwItems == null) {
      homework = (
        <h3>Datum auswählen</h3>
      );
    } else {
      homework = (
        <HomeworkList hwItems={this.state.hwItems}/>
      );
    }

    return (
      <div>
        <DatePicker value={this.state.date} onChange={v => this.handleDatePickerChange(v)}/>
        {homework}
      </div>
    );
  }
}

export default HomeworkContainer;