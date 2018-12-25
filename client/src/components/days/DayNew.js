// DayNew shows DayForm and DayFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import DayForm from './DayForm';
import DayFormReview from './DayFormReview';

class DayNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <DayFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <DayForm
        onDaySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'dayForm'
})(DayNew);
