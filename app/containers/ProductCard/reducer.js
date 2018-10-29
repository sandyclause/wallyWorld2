import {
  fromJS,
  set,
} from 'immutable';
import {
  SELECT_PRODUCT,
} from './actions';

export const initialState = fromJS({
  selectedProductData: {}
});

function selectProduct(state = initialState, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return initialState.set('selectedProductData', action.payload);
    default:
      return state;
  }
}

export default selectProduct;
