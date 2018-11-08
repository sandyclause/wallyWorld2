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
  SELECT_PRODUCT,
  getVariantClear,
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


// product
export function* apiCallProduct(action) {
  console.log('product saga fired', action.payload)
  try {
    const data = yield call(fetchProduct, action.payload);
    const variants = data.get('variants');
    yield put(getProductSuccess(data));
    if (variants !== undefined) {
      yield put(getVariant(variants));
    } else {
      return;
    }
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
  console.log('api call variants', variants.payload)

  if (variants.payload !== -1) {
    const variantsArray = variants.payload;
    const limitedVariantsArray = variantsArray.slice(0,5);
    console.log(variantsArray, limitedVariantsArray)

    try {
      const variantsData = yield all(limitedVariantsArray.map(variant => fetchVariants(variant)).toArray());
      yield put(getVariantSuccess(List(variantsData)));
    } catch(e) {
      yield put(getVariantFailure(e));
      console.log(e)
    }
  } else {
    return;
  }
}

const fetchVariants = (params) => {
  console.log('fetch variants func ------------------')
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
  console.log('callTrends saga fired')
  try {
    const data = yield call(fetchTrends);
    yield put(getTrendsSuccess(data));
  } catch(e) {
    yield put(getTrendsFailure(e));
  }

  return;
}

const fetchTrends = () => {
  console.log('fetch Trends func----------------')
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


export function* selectProductSaga(query) {
  const variants = query.payload.get('variants');
  if (variants !== undefined) {
    yield put(getVariant(variants));
  } else {
    yield put(getVariantClear());
  }
}


// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield [
    takeLatest(GET_PRODUCT_REQUESTED, apiCallProduct),
    takeLatest(GET_TRENDS_REQUESTED, apiCallTrends),
    takeLatest(GET_SEARCH_REQUESTED, apiCallSearch),
    takeLatest(GET_VARIANT_REQUESTED, apiCallVariants),
    takeLatest(SELECT_PRODUCT, selectProductSaga)
  ];
}