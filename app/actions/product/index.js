export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const GET_PRODUCT_REQUESTED = 'GET_PRODUCT_REQUESTED';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const GET_TRENDS_REQUESTED = 'GET_TRENDS_REQUESTED';
export const GET_TRENDS_SUCCESS = 'GET_TRENDS_SUCCESS';
export const GET_TRENDS_FAILURE = 'GET_TRENDS_FAILURE';

export const GET_SEARCH_REQUESTED = 'GET_SEARCH_REQUESTED';
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE';

export const GET_VARIANT_REQUESTED = 'GET_VARIANT_REQUESTED';
export const GET_VARIANT_SUCCESS = 'GET_VARIANT_SUCCESS';
export const GET_VARIANT_FAILURE = 'GET_VARIANT_FAILURE';

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

export const getSearch = (query) => ({
  type: 'GET_SEARCH_REQUESTED',
  payload: query,
})

export const getSearchSuccess = (data) => ({
  type: 'GET_SEARCH_SUCCESS',
  payload: data,
})

export const getSearchFailure = (error) => ({
  type: 'GET_SEARCH_FAILTURE',
  payload: error,
})

export const getVariant = (query) => ({
  type: 'GET_VARIANT_REQUESTED',
  payload: query,
})

export const getVariantSuccess = (data) => ({
  type: 'GET_VARIANT_SUCCESS',
  payload: data,
})

export const getVariantFailure = (error) => ({
  type: 'GET_VARIANT_FAILTURE',
  payload: error,
})