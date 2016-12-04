import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import HomeworkItem from './HomeworkItem.js';

class HomeworkList extends Component {
  render() {
    const noHomeworkItem = {
      title: "Keine Hausaufgaben",
      date: "",
      subject: "",
      desc: ""
    };

    const items = this.props.hwItems.length !== 0
      ? this.props.hwItems.map((hwItem) => {
        return (
          <ListGroupItem key={hwItem.id}>
            <HomeworkItem hwItem={hwItem}/>
          </ListGroupItem>
        )
      })
      : (<ListGroupItem key={0}>
      <HomeworkItem hwItem={noHomeworkItem}/>
    </ListGroupItem>);

    return (
      <div className="homework-list">
        <ListGroup componentClass="ul">
          {items}
        </ListGroup>
      </div>
    );
  }
}

export default HomeworkList;
