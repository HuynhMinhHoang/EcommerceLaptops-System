import axios from "../utils/AxiosConfig";

const loginUser = (username, password) => {
  return axios.post("/api/user/login", {
    username,
    password,
  });
};

const refreshTokenService = (refreshToken) => {
  return axios.post("/api/user/refresh-token", null, {
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
  return axios.post("/api/user/register", {
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

const getListCategory = () => {
  return axios.get("/api/categories");
};

const createProduct = (formData) => {
  return axios.post("/api/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListProductAdmin = () => {
  return axios.get("/api/product/list-admin");
};

const getListProductHome = (category) => {
  return axios.get("/api/product/list", {
    params: {
      category: category,
    },
  });
};

const updateProduct = (productId, formData) => {
  return axios.put(`/api/product/update/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImageFromProduct = (idImages) => {
  return axios.delete(`/api/images/delete`, {
    data: idImages,
  });
};

export {
  loginUser,
  registerUser,
  refreshTokenService,
  createProduct,
  getListCategory,
  getListProductAdmin,
  getListProductHome,
  updateProduct,
  deleteImageFromProduct,
};
