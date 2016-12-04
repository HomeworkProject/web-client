import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import HomeworkContainer from './HomeworkContainer.js'

class MainPage extends Component {
  constructor() {
    super();

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(event) {
    fetch("/homework/api/logout.php", {
      credentials: "include"
    }).then(r => r.json())
      .then(data => {
        if (data.status === "logged_out") {
         this.props.onLogout();
        }
      }).catch(e => console.log("error: " + e));
  }


  render() {
    return (
      <div>
        <Button onClick={this.handleLogoutClick}>
          Logout
        </Button>
        <HomeworkContainer server={this.props.server}/>
      </div>
    );
  }
}

export default MainPage;