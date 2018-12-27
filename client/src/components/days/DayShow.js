import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDay } from '../../actions';

class DayShow extends Component {
  componentDidMount() {
    this.props.fetchDay(this.props.match.params._id);
  }

  renderImage() {
    if(this.props.day.imageUrl) {
      return <img src={'https://s3.us-east-2.amazonaws.com/daily-diary-bucket/' + this.props.day.imageUrl} alt={this.props.day.title}/>
    }
  }

  render() {
    if (!this.props.day) {
      return '';
    }

    const { title, content } = this.props.day;

    return (
      <div className="container">
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ days }, ownProps) {
  return { day: days[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchDay })(DayShow);
