import {
  fromJS,
  set,
} from 'immutable';
import {
  GET_SEARCH_REQUESTED,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAILURE,
} from './actions';

export const initialState = fromJS({
  searchData: {}
});

function apiCall(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_REQUESTED:
      console.log('reducer fireddd');
      return state;
    case GET_SEARCH_SUCCESS:
      console.log('reducer search success');
      
      return initialState.set('searchData', action.payload);
    case GET_SEARCH_FAILURE:
      console.log('reducer search failure');
      return state;
    default:
      return state;
  }
}

export default apiCall;
