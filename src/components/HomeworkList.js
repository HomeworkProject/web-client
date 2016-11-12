import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem.js';

class HomeworkList extends Component {
  render() {
    const hwitems = [
      {
        id: "123098",
        title: "Kondensatoren Graph",
        date: "2016-11-14",
        subject: "Physik",
        desc: "Graphen zu den Messergebnissen zeichnen",
      }
    ];

    const items = hwitems.map((hwitem) => {
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
