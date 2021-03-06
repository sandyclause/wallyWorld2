import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';
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
  getVariantClear,
  GET_REVIEWS_REQUESTED,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  getReviewsSuccess,
  getReviewsFailure,
  getReviews,
} from '../../actions/product';
import axios from "axios";
import Qs from "qs";
import {
  apiKey
} from '../../keys';
import {
  fromJS,
  List,
} from 'immutable';

// reviews
export function* apiCallReviews(action) {
  try {
    const data = yield call(fetchReviews, action.payload);
    yield put(getReviewsSuccess(data));
  } catch(e) {
    yield put(getProductFailure(e));
  }
}

const fetchReviews = (itemId) => {
  return axios({
    url: "https://proxy.hackeryou.com",
    method: "GET",
    dataResponse: "json",
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: "brackets" });
    },
    params: {
      reqUrl: `http://api.walmartlabs.com/v1/reviews/${
        itemId
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

// product
export function* apiCallProduct(action) {
  try {
    const data = yield call(fetchProduct, action.payload);
    const variants = data.get('variants');
    yield put(getProductSuccess(data));
    if (variants !== undefined) {
      yield put(getVariant(variants));
    } else {
      yield put(getVariantClear());
    }
    
    // call reviews
    yield put(getReviews(action.payload));
  } catch(e) {
    yield put(getProductFailure(e));
  }
  
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

  // delay because calls are limited to 5 per second by api
  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  if (variants.payload !== -1) {
    const variantsArray = variants.payload;
    const limitedVariantsArray = variantsArray.slice(0,4);

    yield delay(500);
    try {
      const variantsData = yield all(limitedVariantsArray.map(variant => fetchVariants(variant)).toArray());
      yield put(getVariantSuccess(List(variantsData)));
    } catch(e) {
      yield put(getVariantFailure(e));
    }
  } else {
    return;
  }
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
    takeLatest(GET_REVIEWS_REQUESTED, apiCallReviews)
  ];
}