import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_PRODUCT_REQUESTED,
  getProductSuccess,
  getProductFailure,
} from './actions';
import {fetchProduct} from './api';

export function* apiCallProduct(action) {
  console.log('search saga fired', action.payload)
  try {
    const data = yield call(fetchProduct, action.payload);
    yield put(getProductSuccess(data));
  } catch(e) {
    yield put(getProductFailure(e));
  }

  return;
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_PRODUCT_REQUESTED, apiCallProduct),
  ];
}