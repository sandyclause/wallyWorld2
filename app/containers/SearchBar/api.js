import axios from "axios";
import Qs from "qs";

import {
  fromJS,
} from 'immutable';

export const fetchSearch = (query) => {
  console.log('queryyyyy', query)
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
        apiKey: "y3xen4j3dtzbq4n7snepx8h3",
        query: query
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  }).then(res => {
    console.log('searchResults', res.data)
  });
}