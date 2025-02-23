import axios from "../utils/AxiosConfig";

const loginUser = (username, password) => {
  return axios.post("/api/v1/user/login", {
    username,
    password,
  });
};

const refreshTokenService = (refreshToken) => {
  return axios.post("/api/v1/user/refresh-token", null, {
    params: {
      refreshToken: refreshToken,
    },
  });
};

const registerUser = (formData) => {
  return axios.post("/api/v1/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListCategory = () => {
  return axios.get("/api/v1/categories");
};

const createProduct = (formData) => {
  return axios.post("/api/v1/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListProductAdmin = (page, size) => {
  return axios.get("/api/v1/product/list-admin", {
    params: {
      page: page,
      size: size,
    },
  });
};

const getListProductHome = (category) => {
  return axios.get("/api/v1/product/list", {
    params: {
      category: category,
    },
  });
};

const updateProduct = (productId, formData) => {
  return axios.put(`/api/v1/product/update/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImageFromProduct = (idImages) => {
  return axios.delete(`/api/v1/images/delete`, {
    data: idImages,
  });
};

const getListUser = (page = 0, size = 10) => {
  return axios.get(`/api/v1/admin/list-user`, {
    params: {
      page: page,
      size: size,
    },
  });
};

const deleteProduct = (idProduct) => {
  return axios.delete(`/api/v1/product/delete/${idProduct}`);
};

const updateAccount = (idUser, formData) => {
  return axios.put(`/api/v1/admin/user/${idUser}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getRoles = () => {
  return axios.get("/api/v1/admin/roles");
};

const createAccountByAdmin = (formData) => {
  return axios.post("/api/v1/admin/user/create-user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProductById = (id) => {
  return axios.get(`/api/v1/product/${id}`);
};

const getPaymentVNPay = (
  amount,
  bankCode,
  shippingAddress,
  total_amount,
  note,
  accountId,
  paymentTypeId
) => {
  return axios.get("/api/v1/user/payment/vn-pay", {
    params: {
      amount: amount,
      bankCode: bankCode,
      shippingAddress: shippingAddress,
      total_amount: total_amount,
      note: note,
      accountId: accountId,
      paymentTypeId: paymentTypeId,
    },
  });
};

const getPaymentCOD = (
  shippingAddress,
  total_amount,
  note,
  accountId,
  paymentTypeId
) => {
  return axios.post("/api/v1/user/payment/cod", {
    shippingAddress: shippingAddress,
    total_amount: total_amount,
    note: note,
    accountId: accountId,
    paymentTypeId: paymentTypeId,
  });
};

const createOrderDetail = (orderId, productId, quantity) => {
  return axios.post(
    `/api/v1/user/payment/order-detail?orderId=${orderId}&productId=${productId}&quantity=${quantity}`
  );
};

const sendEmailConfirmOrders = (formData) => {
  return axios.post("/api/v1/user/send-email", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getOrderByAccountId = (idAccount) => {
  return axios.get("/api/v1/orders", {
    params: {
      idAccount: idAccount,
    },
  });
};

const updateAccountByUser = (id, formData) => {
  console.log("formData", formData);
  return axios.patch(`/api/v1/user/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const searchOrders = (accountId, idOrder) => {
  return axios.get(`/api/v1/orders/search`, {
    params: { accountId, idOrder },
  });
};

const verifyFBToken = (token, email) => {
  return axios.post("/api/v1/user/verify-fb-token", { token, email });
};

const verifyGGToken = (socialAccountId, fullName, email, avt, token) => {
  return axios.get("/api/v1/user/verify-gg-token", {
    params: {
      socialAccountId: socialAccountId,
      fullName: fullName,
      email: email,
      avt: avt,
      id_token: token,
    },
  });
};

const getListAccountByRole = (role) => {
  return axios.get("/api/v1/user/list-user-by-role", {
    params: {
      role: role,
    },
  });
};

const getStatsUserByYear = (year) => {
  return axios.get("/api/v1/admin/stats-user/year", {
    params: {
      year: year,
    },
  });
};

const getStatsStatuUser = (year) => {
  return axios.get("/api/v1/admin/stats-user/status/year", {
    params: {
      year: year,
    },
  });
};

const getProductByKeyword = (keyword) => {
  return axios.get("/api/v1/product/search", {
    params: {
      keyword: keyword,
    },
  });
};

const getListAllProductStats = (year) => {
  return axios.get("/api/v1/product/list-stats-admin", {
    params: {
      year: year,
    },
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
  getListUser,
  deleteProduct,
  updateAccount,
  getRoles,
  createAccountByAdmin,
  getProductById,
  getPaymentVNPay,
  getPaymentCOD,
  createOrderDetail,
  sendEmailConfirmOrders,
  getOrderByAccountId,
  updateAccountByUser,
  searchOrders,
  verifyFBToken,
  verifyGGToken,
  getListAccountByRole,
  getStatsUserByYear,
  getStatsStatuUser,
  getProductByKeyword,
  getListAllProductStats,
};
