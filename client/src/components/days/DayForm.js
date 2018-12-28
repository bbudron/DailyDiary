// DayForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import DayField from './DayField';
import formFields from './formFields';

class DayForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={DayField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onDaySubmit)}>
          {this.renderFields()}
          <div className="card">
            <div className="card-actions">
              <Link to="/days" className="card-action">
                <span className="card-link">Cancel</span>
              </Link>
              <button type="submit" className="card-action">
                <span className="card-link">Done</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'dayForm',
  destroyOnUnmount: false
})(DayForm);
