export const GET_TRENDS_REQUESTED = 'GET_TRENDS_REQUESTED';
export const GET_TRENDS_SUCCESS = 'GET_TRENDS_SUCCESS';
export const GET_TRENDS_FAILURE = 'GET_TRENDS_FAILURE';

export const getTrends = () => ({
  type: 'GET_TRENDS_REQUESTED',
})

export const getTrendsSuccess = (data) => ({
  type: 'GET_TRENDS_SUCCESS',
  payload: data,
})

export const getTrendsFailure = (error) => ({
  type: 'GET_TRENDS_FAILTURE',
  payload: error,
})