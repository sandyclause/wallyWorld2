export const GET_PRODUCT_REQUESTED = 'GET_PRODUCT_REQUESTED';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const getProduct = (itemId) => ({
  type: 'GET_PRODUCT_REQUESTED',
  payload: itemId,
})

export const getProductSuccess = (data) => ({
  type: 'GET_PRODUCT_SUCCESS',
  payload: data,
})

export const getProductFailure = (error) => ({
  type: 'GET_PRODUCT_FAILURE',
  payload: error,
})