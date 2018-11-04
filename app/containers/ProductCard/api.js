import axios from "axios";
import Qs from "qs";
import {
  apiKey
} from '../../keys';

import {
  fromJS,
} from 'immutable';

export const fetchProduct = (itemId) => {
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