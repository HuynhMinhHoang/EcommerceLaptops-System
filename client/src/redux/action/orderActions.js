export const SET_ORDER_ID = "SET_ORDER_ID";
export const SET_PAYMENT_STATUS = "SET_PAYMENT_STATUS";
export const RESET_ORDER_ID = "RESET_ORDER_ID";
export const RESET_STATE_PAYMENT = "RESET_STATE_PAYMENT";

export const setOrderId = (id) => ({
  type: SET_ORDER_ID,
  payload: id,
});

export const setPaymentStatus = (status) => ({
  type: SET_PAYMENT_STATUS,
  payload: status,
});

export const resetOrderId = () => ({
  type: RESET_ORDER_ID,
});

export const resetStatePayment = () => ({
  type: RESET_STATE_PAYMENT,
});
