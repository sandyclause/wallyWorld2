import { createSelector } from 'reselect';
import {
  Map,
  List,
} from 'immutable';

const productState = state => state.get('Product', Map());

const makeSelectProduct = createSelector(
  productState,
  state => state.get('selectedProductData', Map())
);

const makeSelectTrends = createSelector(
  productState,
  state => state.getIn(['trendsData', 'items'], Map())
);

const makeSelectSearchResults = createSelector(
  productState,
  state => state.getIn(['searchData', 'items'], Map())
);

const makeSelectVariants = createSelector(
  productState,
  state => state.get('variantData', List())
);

const makeSelectReviews = createSelector(
  productState,
  state => state.get('reviewsData', Map())
);

export {
  makeSelectProduct,
  makeSelectTrends,
  makeSelectSearchResults,
  makeSelectVariants,
  makeSelectReviews,
};