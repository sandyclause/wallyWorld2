export const GET_SEARCH_REQUESTED = 'GET_SEARCH_REQUESTED';
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE';

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