import {
  fromJS,
  set,
} from 'immutable';
import {
  GET_TRENDS_REQUESTED,
  GET_TRENDS_SUCCESS,
  GET_TRENDS_FAILURE,
} from './actions';

export const initialState = fromJS({
  trendsData: {}
});

function apiCall(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS_REQUESTED:
      console.log('reducer fireddd');
      return state;
    case GET_TRENDS_SUCCESS:
      console.log('reducer trends success');
      return initialState.set('trendsData', action.payload);
    case GET_TRENDS_FAILURE:
      console.log('reducer trends failure');
      return state;
    default:
      return state;
  }
}

export default apiCall;
