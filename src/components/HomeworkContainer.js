import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import HomeworkList from './HomeworkList.js';
import * as Util from '../Util.js';

class HomeworkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hwItems: null,
      loading: false,
      date: null,
    };

    this.datePickerDayLabels = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    this.datePickerMonthLabels = ["Januar", "Februar", "März", "April",
      "Mai", "Juni", "Juli", "August", "September", "Oktober",
      "November", "Dezember"];

    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleTomorrowClick = this.handleTomorrowClick.bind(this);
    this.handleAfterTomorrowClick = this.handleAfterTomorrowClick.bind(this);
  }

  loadHomework(dateS) {
    this.setState({
      loading: true
    });

    const date = new Date(dateS);
    const requestParameters = {
      server: this.props.server.connection.host,
      port: this.props.server.connection.plainPort,
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

  handleTomorrowClick(e) {
    const today = new Date();
    const tomorrow = Util.addDays(today, 1);
    this.setState({
      date: tomorrow.toISOString()
    });

    this.loadHomework(tomorrow.toISOString());
  }

  handleAfterTomorrowClick(e) {
    const today = new Date();
    const afterTomorrow = Util.addDays(today, 2);
    this.setState({
      date: afterTomorrow.toISOString()
    });

    this.loadHomework(afterTomorrow.toISOString());
  }

  render() {
    const selectors = (
      <div>
        <DatePicker value={this.state.date} placeholder="Datum auswählen"
                    onChange={this.handleDatePickerChange}
                    dayLabels={this.datePickerDayLabels}
                    monthLabels={this.datePickerMonthLabels}
                    dateFormat="DD.MM.YYYY" showClearButton={false}/>
        <Button onClick={this.handleTomorrowClick}>Morgen</Button>
        <Button onClick={this.handleAfterTomorrowClick}>Übermorgen</Button>
      </div>
    );

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
        {selectors}
        {homework}
      </div>
    );
  }
}

export default HomeworkContainer;