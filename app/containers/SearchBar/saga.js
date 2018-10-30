import { takeLatest, call, put, select } from 'redux-saga/effects';
import {fetchSearch} from './api';
import {
  GET_SEARCH_REQUESTED,
  getSearchSuccess,
  getSearchFailure,
} from './actions';

export function* apiCallSearch(action) {
  try {
    const data = yield call(fetchSearch, action.payload);
    yield put(getSearchSuccess(data));
  } catch(e) {
    yield put(getSearchFailure(e));
  }
  return;
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_SEARCH_REQUESTED, apiCallSearch),
  ];
}