import React, {Component} from 'react';
import HomeworkList from './HomeworkList.js';

class HomeworkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hwItems: null,
      loading: true,
    };

    var requestBody = [];
    for (var property in props.credentials) {
      if (props.credentials.hasOwnProperty(property)) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(props.credentials[property]);
        requestBody.push(encodedKey + "=" + encodedValue);
      }
    }
    requestBody = requestBody.join("&");

    fetch("/homework/api/homework.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestBody
    }).then(r => {
      console.log(r);
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

  render() {
    if (this.state.loading) {
      return (
        <h3>Loading...</h3>
      );
    } else {
      return (
        <HomeworkList hwItems={this.state.hwItems}/>
      );
    }
  }
}

export default HomeworkContainer;