import axios from "axios";
import { store } from "../redux/store";
import { doLogin } from "../redux/action/userAction";

const refreshInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const refresh_token = store?.getState()?.userRedux?.user?.refreshToken;
  try {
    const response = await refreshInstance.post("/refresh-token", {
      refreshToken: refresh_token,
    });
    const { accessToken, refreshToken, ...user } = response.data;
    store.dispatch(
      doLogin({
        access_token: accessToken,
        refresh_token: refreshToken,
        ...user,
      })
    );
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

export default refreshToken;
