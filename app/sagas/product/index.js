import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  GET_PRODUCT_REQUESTED,
  getProductSuccess,
  getProductFailure,
  GET_TRENDS_REQUESTED,
  getTrendsSuccess,
  getTrendsFailure,
  GET_SEARCH_REQUESTED,
  getSearchSuccess,
  getSearchFailure,
  getVariant,
  getVariantSuccess,
  getVariantFailure,
  GET_VARIANT_REQUESTED,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAILURE,
} from '../../actions/product';
import axios from "axios";
import Qs from "qs";
import {
  apiKey
} from '../../keys';
import {
  fromJS,
} from 'immutable';


// product
export function* apiCallProduct(action) {
  console.log('search saga fired', action.payload)
  try {
    const data = yield call(fetchProduct, action.payload);
    const variants = data.get('variants');
    yield put(getProductSuccess(data));
    yield put(getVariant(variants));
  } catch(e) {
    yield put(getProductFailure(e));
  }
  return;
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


// variants
export function* apiCallVariants(variants) {
  const variantsArray = variants.payload.get('0');
  try {
    console.log(variantsArray)
    const variantsData = yield call(fetchVariants, variantsArray);
    yield put(getVariantSuccess(variantsData));
  } catch(e) {
    yield put(getVariantFailure(e));
    console.log(e)
  }
  return;

}

const fetchVariants = (params) => {
  return axios({
    url: "https://proxy.hackeryou.com",
    method: "GET",
    dataResponse: "json",
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: "brackets" });
    },
    params: {
      reqUrl: `http://api.walmartlabs.com/v1/items/${
        params
        }`,
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


// trends
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


//search
export function* apiCallSearch(action) {
  try {
    const data = yield call(fetchSearch, action.payload);
    yield put(getSearchSuccess(data));
  } catch(e) {
    yield put(getSearchFailure(e));
  }
  return;
}

const fetchSearch = (query) => {
  return axios({
    url: "https://proxy.hackeryou.com",
    method: "GET",
    dataResponse: "json",
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: "brackets" });
    },
    params: {
      reqUrl:
        "http://api.walmartlabs.com/v1/search",
      params: {
        apiKey: apiKey,
        query: query
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
    takeLatest(GET_SEARCH_REQUESTED, apiCallSearch),
    takeLatest(GET_VARIANT_REQUESTED, apiCallVariants),
  ];
}