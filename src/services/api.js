import axios from "axios";

const api = `https://conduit.productionready.io/api`;
const user = JSON.parse(localStorage.getItem("user")) || {};
const token = user.token;

export default class Api {
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    return headers;
  }
  get(url) {
    if (token == null) {
      return axios
        .get(api + url)
        .then(res => res.data)
        .catch(error => error.response.data);
    } else {
      return axios
        .get(api + url, { headers: this.getHeaders() })
        .then(res => res.data)
        .catch(error => error.response.data);
    }
  }

  post(url, data) {
    if (token == null) {
      return axios
        .post(api + url, data)
        .then(res => res.data)
        .catch(error => error.response.data);
    } else {
      return axios
        .post(api + url, data, { headers: this.getHeaders() })
        .then(res => res.data)
        .catch(error => error.response.data);
    }
  }

  delete(url) {
    return axios
      .delete(api + url, { headers: this.getHeaders() })
      .then(res => res.data)
      .catch(error => error.response.data);
  }

  put(url, data) {
    return axios
      .put(api + url, data, { headers: this.getHeaders() })
      .then(res => res.data)
      .catch(error => error.response.data);
  }
}
