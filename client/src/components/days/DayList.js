import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDays } from '../../actions';

class DayList extends Component {
  componentDidMount() {
    this.props.fetchDays();
  }

  renderDays() {
    return map(this.props.days, day => {
      if(!Array.isArray(day)) {
        return (
          <div className="card darken-1 horizontal" key={day._id}>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">{day.title}</span>
                <p>{day.content}</p>
              </div>
              <div className="card-action">
                <Link to={`/days/${day._id}`}>Read</Link>
              </div>
            </div>
          </div>
        );
      } else null;
    });
  }

  render() {
    return <div>{this.renderDays()}</div>
  }
}

function mapStateToProps({ days }) {
  return { days };
}

export default connect(mapStateToProps, { fetchDays })(DayList);
