import {
  fromJS,
  set,
} from 'immutable';
import {
  SELECT_PRODUCT,
  GET_PRODUCT_REQUESTED,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_TRENDS_REQUESTED,
  GET_TRENDS_SUCCESS,
  GET_TRENDS_FAILURE,
} from '../../actions/product';
  
  export const initialState = fromJS({
    selectedProductData: {},
    trendsData: {}
  });
  
  function selectProduct(state = initialState, action) {
    switch (action.type) {
      case SELECT_PRODUCT:
        return initialState.set('selectedProductData', action.payload);
      case GET_PRODUCT_REQUESTED:
        console.log('reducer fireddd');
        return state;
      case GET_PRODUCT_SUCCESS:
        console.log('reducer product success');
        return initialState.set('selectedProductData', action.payload);
      case GET_PRODUCT_FAILURE:
        console.log('reducer product failure');
        return initialState.set('apiFail', action.payload);
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
  
  export default selectProduct;
  