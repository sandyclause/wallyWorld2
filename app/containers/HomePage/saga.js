import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_TRENDS
} from './actions';

export function* apiCallTrends() {
  console.log('saga fired');
  return;
}

// Root saga
export default function* rootSaga() {
  console.log('loading homepage saga');
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_TRENDS, apiCallTrends),
  ];
}