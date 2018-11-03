import {
    fromJS,
    set,
  } from 'immutable';
  import {
    GET_PRODUCT_REQUESTED,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
  } from './actions';
  
  export const initialState = fromJS({
    ProductData: {}
  });
  
  function apiCall(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCT_REQUESTED:
        console.log('reducer fireddd');
        return state;
      case GET_PRODUCT_SUCCESS:
        console.log('reducer product success');
        return initialState.set('selectedProductData', action.payload);
      case GET_PRODUCT_FAILURE:
        console.log('reducer product failure');
        return state;
      default:
        return state;
    }
  }
  
  export default apiCall;
  