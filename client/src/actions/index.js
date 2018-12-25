import axios from 'axios';
import { FETCH_USER, FETCH_DAYS, FETCH_DAY } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitDay = (values, file, history) => async dispatch => {
  const uploadConfig = await axios.get('/api/upload');

  if(file != null) {
    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    })
  }
  
  const res = await axios.post('/api/days', {
    ...values, imageUrl: uploadConfig.data.key
  });

  history.push('/days');
  dispatch({ type: FETCH_DAY, payload: res.data });
};

export const fetchDays = () => async dispatch => {
  const res = await axios.get('/api/days');

  dispatch({ type: FETCH_DAYS, payload: res.data });
};

export const fetchDay = id => async dispatch => {
  const res = await axios.get(`/api/days/${id}`);

  dispatch({ type: FETCH_DAY, payload: res.data });
};
