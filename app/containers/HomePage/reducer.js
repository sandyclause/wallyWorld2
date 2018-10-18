import { fromJS } from 'immutable';
import {
  GET_TRENDS
} from './actions';

export const initialState = {};

function apiCall(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      console.log('reducer fireddd');
      return state;
    default:
      return state;
  }
}

export default apiCall;
