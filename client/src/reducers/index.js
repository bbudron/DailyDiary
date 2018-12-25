import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import daysReducer from './daysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  days: daysReducer
});
