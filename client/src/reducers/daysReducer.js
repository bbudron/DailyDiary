import mapKeys from 'lodash/mapKeys';
import { FETCH_DAYS, FETCH_DAY } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DAY:
      const day = action.payload;
      return { ...state, [day._id]: day };
    case FETCH_DAYS:
      return { ...state, ...mapKeys(action.payload, '_id') };
    default:
      return state;
  }
}
