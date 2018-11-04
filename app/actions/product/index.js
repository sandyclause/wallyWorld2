export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const GET_PRODUCT_REQUESTED = 'GET_PRODUCT_REQUESTED';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const GET_TRENDS_REQUESTED = 'GET_TRENDS_REQUESTED';
export const GET_TRENDS_SUCCESS = 'GET_TRENDS_SUCCESS';
export const GET_TRENDS_FAILURE = 'GET_TRENDS_FAILURE';


export const selectProduct = (query) => ({
  type: 'SELECT_PRODUCT',
  payload: query,
})

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

export const getTrends = () => ({
  type: 'GET_TRENDS_REQUESTED',
})

export const getTrendsSuccess = (data) => ({
  type: 'GET_TRENDS_SUCCESS',
  payload: data,
})

export const getTrendsFailure = (error) => ({
  type: 'GET_TRENDS_FAILURE',
  payload: error,
})