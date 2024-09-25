import axios from "axios";
import { store } from "../redux/store";
import { doLogout } from "../redux/action/userAction";
import { path } from "./Constants";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use(
  (config) => {
    NProgress.start();
    const accessToken = store?.getState()?.userRedux?.user?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  async (error) => {
    NProgress.done();
    if (error.response.status === 403) {
      store.dispatch(doLogout());
      // window.location.href = `${path.HOMEPAGE}/${path.LOGIN}`;
      console.log("error.response.status === 403");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
