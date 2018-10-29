export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const selectProduct = (query) => ({
  type: 'SELECT_PRODUCT',
  payload: query,
})