import axios from "axios";

const api = `https://conduit.productionready.io/api`;
const token = localStorage.getItem("token");

export default class Api {
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`
    };
    return headers;
  }
  // get (url, params) {
  //     return axios.get(this.api, url, )
  // }

  post(url, data) {
    if(token == null) {
      return axios.post(api + url, data)
      .then((res) => res.data)
      .catch(error => error.response.data);
    } else {
      return   axios.post(api + url, data, { headers: this.getHeaders() })
      .then((res) => res.data)
      .catch((error) => error.response.data);
    }
  
  }

  // delete(url) {

  // }

  // put(url) {

  // }
}
