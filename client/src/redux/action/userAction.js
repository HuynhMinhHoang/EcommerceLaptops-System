export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const UPDATE_PROFILE_USER = "UPDATE_PROFILE_USER";

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

export const updateProfileUser = (data) => {
  console.log("userAccount", data);
  return {
    type: "UPDATE_PROFILE_USER",
    payload: {
      data,
    },
  };
};
