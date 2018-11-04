import {
  fromJS,
  set,
} from 'immutable';
import {
  SELECT_PRODUCT,
  GET_PRODUCT_REQUESTED,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
} from '../../actions/product';
  
  export const initialState = fromJS({
    selectedProductData: {}
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
      default:
        return state;
    }
  }
  
  export default selectProduct;
  