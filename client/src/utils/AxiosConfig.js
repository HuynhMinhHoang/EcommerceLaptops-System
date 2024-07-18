import axios from "axios";
import { store } from "../redux/store";
import { doLogin } from "../redux/action/userAction";
import { refreshTokenService } from "../service/APIService";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState()?.userRedux?.user?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const refresh_token =
            store?.getState()?.userRedux?.user?.refreshToken;
          const { data } = await refreshTokenService(refresh_token);
          const newToken = data.accessToken;
          store.dispatch(doLogin(data));
          originalRequest.headers.Authorization = "Bearer " + newToken;
          console.log("refresh_token", refresh_token);
          return axios(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });

        const refresh_token = store?.getState()?.userRedux?.user?.refreshToken;
        refreshTokenService(refresh_token)
          .then((response) => {
            const newToken = response.data.accessToken;
            store.dispatch(doLogin(response.data));
            originalRequest.headers.Authorization = "Bearer " + newToken;
            processQueue(null, newToken);
            resolve(instance(originalRequest));
          })
          .catch((error) => {
            processQueue(error, null);
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
