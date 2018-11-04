import { createSelector } from 'reselect';
import {
  Map,
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

export {
  makeSelectProduct,
  makeSelectTrends,
};