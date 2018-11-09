import {
  fromJS,
  List,
} from 'immutable';
import {
  SELECT_PRODUCT,
  GET_PRODUCT_REQUESTED,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_TRENDS_REQUESTED,
  GET_TRENDS_SUCCESS,
  GET_TRENDS_FAILURE,
  GET_SEARCH_REQUESTED,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAILURE,
  GET_VARIANT_REQUESTED,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAILURE,
  GET_VARIANT_CLEAR,
  GET_REVIEWS_REQUESTED,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
} from '../../actions/product';
  
  export const initialState = fromJS({
    selectedProductData: {},
    trendsData: {},
    searchData: {},
    variantData: {},
    reviewsData: {},
  });
  
  function selectProduct(state = initialState, action) {
    switch (action.type) {
      // product
      case SELECT_PRODUCT:
        return state.set('selectedProductData', action.payload);
      case GET_PRODUCT_REQUESTED:
        console.log('get product reducer fireddd');
        return state;
      case GET_PRODUCT_SUCCESS:
        console.log('reducer product success');
        return state.set('selectedProductData', action.payload);
      case GET_PRODUCT_FAILURE:
        console.log('reducer product failure');
        return state.set('apiFail', action.payload);

      // trends
      case GET_TRENDS_REQUESTED:
        console.log('reducer fireddd');
        return state;
      case GET_TRENDS_SUCCESS:
        console.log('reducer trends success');
        return state.set('trendsData', action.payload);
      case GET_TRENDS_FAILURE:
        console.log('reducer trends failure');
        return state;

      // search
      case GET_SEARCH_REQUESTED:
        console.log('get search requested');
        return state;
      case GET_SEARCH_SUCCESS:
        console.log('reducer search success', action.payload);
        return state.set('searchData', action.payload);
      case GET_SEARCH_FAILURE:
        console.log('reducer search failure');
        return state;

      // variant
      case GET_VARIANT_REQUESTED:
        console.log('get variant requested');
        return state;
      case GET_VARIANT_SUCCESS:
        console.log('reducer variant success', action.payload);
        return state.set('variantData', action.payload);
      case GET_VARIANT_FAILURE:
        console.log('reducer variant failure');
        return state;
      case GET_VARIANT_CLEAR:
        console.log('reducer variant cleared');
        return state.set('variantData', List());

      // reviews
      case GET_REVIEWS_REQUESTED:
      console.log('get REVIEWS requested');
      return state;
      case GET_REVIEWS_SUCCESS:
        console.log('reducer REVIEWS success', action.payload);
        return state.set('reviewsData', action.payload);
      case GET_REVIEWS_FAILURE:
        console.log('reducer REVIEWS failure');
        return state;

      default:
        return state;
      }
  }
  
  export default selectProduct;
  