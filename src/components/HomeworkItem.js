import React, {Component} from 'react';
import './HomeworkItem.css'

class HomeworkItem extends Component {
  render() {
    const arrDate = this.props.hwItem.date;
    const strDate = arrDate[2] + "." + arrDate[1] + "." + arrDate[0];

    return (
      <div>
        <h4 className="homework-title">
          {this.props.hwItem.title}
        </h4>
        <div className="homework-date">
          {strDate}
        </div>
        <div className="homework-subject">
          {this.props.hwItem.subject}
        </div>
        <div className="homework-item-desc">
          {this.props.hwItem.desc}
        </div>
      </div>
    );
  }
}

export default HomeworkItem;