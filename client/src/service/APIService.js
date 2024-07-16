import axios from "../utils/AxiosConfig";

const loginUser = (username, password) => {
  return axios.post("/user/login", {
    username,
    password,
  });
};

const refreshToken = (refreshToken) => {
  return axios.post("/user/refresh-token", null, {
    params: {
      refreshToken: refreshToken,
    },
  });
};

const registerUser = (
  username,
  password,
  fullName,
  gender,
  dateOfBirth,
  email,
  phone,
  address
) => {
  return axios.post("/user/register", {
    username,
    password,
    fullName,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
  });
};

export { loginUser, registerUser, refreshToken };
