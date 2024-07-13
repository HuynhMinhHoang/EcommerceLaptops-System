import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false,
  // easing: 'ease'
  // speed: 500,
  // trickle Rate: 0.5,
  // easing: 'ease',
  // speed: 200, I
  // trickle: true,
  // trickleRate: 0.02,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    NProgress.start();
    console.log("NProgress.start();");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    NProgress.done();
    console.log("NProgress.start();");
    return response;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default instance;
