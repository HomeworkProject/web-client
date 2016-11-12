import React, {Component} from 'react';
import HomeworkList from './HomeworkList.js';

class HomeworkContainer extends Component {
  constructor() {
    super();
    this.state = {
      hwItems: null,
      loading: true,
    };


    fetch('/homework/api/homework.php').then(r => r.json())
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