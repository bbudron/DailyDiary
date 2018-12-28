// DayFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class DayFormReview extends Component {
  state = {
    file: null,
    uploading: false
  }

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div className="card">
      <div className="card-actions">
        <button
          className="card-action"
          onClick={onCancel}
        >
          <span className="card-link">Back</span>
        </button>

        <button className="card-action">
          <span className="card-link">Save Day</span>
        </button>
      </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({uploading: true})
    const { submitDay, history, formValues } = this.props;
    submitDay(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({file: event.target.files[0]})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}

        <h5>Add an image</h5>
        <input type="file" accept="image/*" onChange={this.onFileChange.bind(this)}/>

        {this.renderButtons()}

        <div className="row" id={this.state.uploading ? "alert_box1" : "alert_box2"}>
          <div className="col s12 m12">
            <div className="card blue darken-1">
                  <div className="card-content white-text">
                    <p>one moment please...</p>
                  </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.dayForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(DayFormReview));
