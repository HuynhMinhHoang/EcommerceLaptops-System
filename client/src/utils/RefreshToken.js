// import axios from "../utils/AxiosConfig";
// import { store } from "../redux/store";
// import { doLogin } from "../redux/action/userAction";
// import { refreshTokenService } from "../service/APIService";

// const refreshToken = async () => {
//   const refresh_token = store?.getState()?.userRedux?.user?.refreshToken;
//   try {
//     const response = await refreshTokenService(refresh_token);
//     const { accessToken, refreshToken, ...user } = response.data;
//     store.dispatch(
//       doLogin({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         ...user,
//       })
//     );
//     return accessToken;
//   } catch (error) {
//     console.error("Refresh token failed:", error);
//     throw error;
//   }
// };

// export default refreshToken;
