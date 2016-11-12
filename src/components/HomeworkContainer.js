import React, {Component} from 'react';
import HomeworkList from './HomeworkList.js';

class HomeworkContainer extends Component {
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

    return (
      <HomeworkList hwitems={hwitems}/>
    );
  }
}

export default HomeworkContainer;