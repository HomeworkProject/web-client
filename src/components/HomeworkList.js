import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem.js';

class HomeworkList extends Component {
  render() {
    const items = this.props.hwItems.map((hwItem) => {
      return (
        <li key={hwItem.id}>
          <HomeworkItem hwItem={hwItem}/>
        </li>
      )
    });

    return (
      <div className="homework-list">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default HomeworkList;
