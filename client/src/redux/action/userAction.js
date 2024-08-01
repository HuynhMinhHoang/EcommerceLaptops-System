export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";

export const doLogin = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      ...data,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  };
};

export const doLogout = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
};
