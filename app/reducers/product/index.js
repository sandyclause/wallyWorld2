import {
  fromJS,
  List,
} from 'immutable';
import {
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
      case GET_PRODUCT_REQUESTED:
        return state;
      case GET_PRODUCT_SUCCESS:
        return state.set('selectedProductData', action.payload);
      case GET_PRODUCT_FAILURE:
        return state.set('apiFail', action.payload);

      // trends
      case GET_TRENDS_REQUESTED:
        return state;
      case GET_TRENDS_SUCCESS:
        return state.set('trendsData', action.payload);
      case GET_TRENDS_FAILURE:
        return state;

      // search
      case GET_SEARCH_REQUESTED:
        return state;
      case GET_SEARCH_SUCCESS:
        return state.set('searchData', action.payload);
      case GET_SEARCH_FAILURE:
        return state;

      // variant
      case GET_VARIANT_REQUESTED:
        return state;
      case GET_VARIANT_SUCCESS:
        return state.set('variantData', action.payload);
      case GET_VARIANT_FAILURE:
        return state;
      case GET_VARIANT_CLEAR:
        return state.set('variantData', List());

      // reviews
      case GET_REVIEWS_REQUESTED:
      return state;
      case GET_REVIEWS_SUCCESS:
        return state.set('reviewsData', action.payload);
      case GET_REVIEWS_FAILURE:
        return state;

      default:
        return state;
      }
  }
  
  export default selectProduct;
  