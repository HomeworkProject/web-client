import React, {Component} from 'react';
import './HomeworkItem.css'

class HomeworkItem extends Component {
  render() {
    return (
      <div className="homework-item">
        <h4 className="homework-title">
          {this.props.hwitem.title}
        </h4>
        <div className="homework-date">
          {this.props.hwitem.date}
        </div>
        <div className="homework-subject">
          {this.props.hwitem.subject}
        </div>
        <div className="homework-item-desc">
          {this.props.hwitem.desc}
        </div>
      </div>
    );
  }
}

export default HomeworkItem;