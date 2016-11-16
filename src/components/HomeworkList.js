import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import HomeworkItem from './HomeworkItem.js';

class HomeworkList extends Component {
  render() {
    const items = this.props.hwItems.map((hwItem) => {
      return (
        <ListGroupItem key={hwItem.id}>
          <HomeworkItem hwItem={hwItem}/>
        </ListGroupItem>
      )
    });

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
