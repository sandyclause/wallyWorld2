import { createSelector } from 'reselect';

// const selectMyState = () => createSelector(

// );
const productCardSelected = state => state.get('ProductCard');

const makeSelectProduct = createSelector(
  productCardSelected,
  state => state.get('selectedProductData')
);

export {
  makeSelectProduct,
};