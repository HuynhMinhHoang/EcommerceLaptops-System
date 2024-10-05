import { status } from "nprogress";
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  UPDATE_PROFILE_USER,
  LOGIN_USER_SUCCESS_FB,
} from "../action/userAction";

const INITIAL_STATE = {
  user: {
    idAccount: null,
    fullName: "",
    dateOfBirth: null,
    gender: "",
    address: "",
    email: "",
    phone: "",
    username: "",
    avt: null,
    status: "",
    role: "",
    accessToken: "",
    refreshToken: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      const data = action.payload;
      console.log(data);
      return {
        ...state,
        user: {
          ...state.user,
          ...data,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
        isAuthenticated: true,
      };

    case LOGIN_USER_SUCCESS_FB:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        isAuthenticated: true,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: INITIAL_STATE.user,
        isAuthenticated: false,
      };

    case UPDATE_PROFILE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.data,
        },
      };

    // case UPDATE_PASSWORD_USER:

    default:
      return state;
  }
};

export default userReducer;
