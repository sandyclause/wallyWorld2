import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_TRENDS_REQUESTED,
  getTrendsSuccess,
  getTrendsFailure,
} from './actions';
import {fetchTrends} from './api';

export function* apiCallTrends() {
  console.log('saga fired')
  try {
    const data = yield call(fetchTrends);
    yield put(getTrendsSuccess(data));
  } catch(e) {
    console.log(e);
    yield put(getTrendsFailure(e));
  }

  return;
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_TRENDS_REQUESTED, apiCallTrends),
  ];
}