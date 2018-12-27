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
                <span className="cards-title">
                  {(day.title.length > 16) ? (day.title.substring(0,16)+"...") : (day.title) }
                </span>
                <p className="cards-body">
                  {(day.content.length > 30) ? (day.content.substring(0,30)+"...") : (day.content) }
                </p>
              </div>
                <Link to={`/days/${day._id}`}>
                  <div className="card-action">
                    <div className="wall">
                      <span className="card-link">Read Entry</span>
                    </div>
                  </div>
                </Link>
            </div>
          </div>
        );
      } else return null;
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
