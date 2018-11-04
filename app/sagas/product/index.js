import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_PRODUCT_REQUESTED,
  getProductSuccess,
  getProductFailure,
  GET_TRENDS_REQUESTED,
  getTrendsSuccess,
  getTrendsFailure,
} from '../../actions/product';
import axios from "axios";
import Qs from "qs";
import {
  apiKey
} from '../../keys';
import {
  fromJS,
} from 'immutable';

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

export function* apiCallTrends() {
  console.log('saga fired')
  try {
    const data = yield call(fetchTrends);
    yield put(getTrendsSuccess(data));
  } catch(e) {
    yield put(getTrendsFailure(e));
  }

  return;
}

const fetchTrends = () => {
  return axios({
    url: "https://proxy.hackeryou.com",
    method: "GET",
    dataResponse: "json",
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: "brackets" });
    },
    params: {
      reqUrl:
        "http://api.walmartlabs.com/v1/trends",
      params: {
        apiKey: apiKey
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  }).then(res => {
    return fromJS(res.data);
  });
}

const fetchProduct = (itemId) => {
    return axios({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl:
          `http://api.walmartlabs.com/v1/items/${itemId}`,
        params: {
          apiKey: apiKey
        },
        proxyHeaders: {
          headers_params: "value"
        },
        xmlToJSON: false
      }
    }).then(res => {
      return fromJS(res.data);
    });
  }

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_PRODUCT_REQUESTED, apiCallProduct),
    takeLatest(GET_TRENDS_REQUESTED, apiCallTrends),
  ];
}