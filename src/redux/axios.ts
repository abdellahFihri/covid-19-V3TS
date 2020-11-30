import axios from "axios";

import { store } from "./store";
const http = axios.create();
http.interceptors.request.use(
  (config) => {
    store.dispatch({
      type: "START_LOADING",
    });
    return config;
  },
  (error) => {
    store.dispatch({ type: "FINISH_LOADING" });
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    store.dispatch({
      type: "FINISH_LOADING",
    });
    return response;
  },
  (error) => {
    store.dispatch({ type: "FINISH_LOADING" });
    return Promise.reject(error);
  }
);

export default http;
