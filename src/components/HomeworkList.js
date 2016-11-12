import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem.js';

class HomeworkList extends Component {
  render() {
    const items = this.props.hwitems.map((hwitem) => {
      return (
        <li key={hwitem.id}>
          <HomeworkItem hwitem={hwitem}/>
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
