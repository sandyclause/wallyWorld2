import axios from "axios";
import Qs from "qs";

export const fetchTrends = () => {
  axios({
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
        apiKey: "y3xen4j3dtzbq4n7snepx8h3"
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  }).then(res => {
    console.log(res.data);
  });
}