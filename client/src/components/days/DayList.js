import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDays, deleteDay } from '../../actions';

class DayList extends Component {
  componentDidMount() {
    this.props.fetchDays();
  }

  deleteToday({_user, _id, imageUrl}, days) {  
      const { deleteDay, history, formValues } = this.props;
      deleteDay(_user, _id, imageUrl, this.props.days);
  }

  renderDays() {
    if(!(Object.keys(this.props.days).length === 0)) {
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
  
                <div className="card-actions">
                  <Link to={`/days/${day._id}`} className="card-action">
                      <span className="card-link">Read Entry</span>
                  </Link>
  
                  <div className="card-action" onClick={() => this.deleteToday(day)}>
                      <span className="card-link">Delete Entry</span>
                  </div>      
                </div>
              </div>
            </div>
          );
        } else return null;
      });
    } else {
      return (
        <div className="card darken-1 horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <span className="cards-title">
                Welcome
              </span>
              <p className="cards-body">
                You have not created any diary entries, get started above!
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderDays()}</div>
  }
}

function mapStateToProps({ days }) {
  return { days };
}

export default connect(mapStateToProps, { fetchDays, deleteDay })(DayList);
