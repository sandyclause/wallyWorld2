import { createSelector } from 'reselect';
import {
  Map,
} from 'immutable';

const productCardSelected = state => state.get('ProductCard', Map());

const makeSelectProduct = createSelector(
  productCardSelected,
  state => state.get('selectedProductData', Map())
);

export {
  makeSelectProduct,
};