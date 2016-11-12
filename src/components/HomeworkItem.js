import React, {Component} from 'react';
import './HomeworkItem.css'

class HomeworkItem extends Component {
  render() {
    return (
      <div className="homework-item">
        <h4 className="homework-title">
          {this.props.hwItem.title}
        </h4>
        <div className="homework-date">
          {this.props.hwItem.date}
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