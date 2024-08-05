import {
  SET_ORDER_ID,
  SET_PAYMENT_STATUS,
  RESET_ORDER_ID,
  RESET_STATE_PAYMENT,
} from "../action/orderActions";

const initialState = {
  idOrder: null,
  paymentStatus: "pending",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_ID:
      return {
        ...state,
        idOrder: action.payload,
      };
    case SET_PAYMENT_STATUS:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    case RESET_ORDER_ID:
      return {
        ...state,
        idOrder: null,
      };
    case RESET_STATE_PAYMENT:
      return {
        ...state,
        paymentStatus: "pending",
      };
    default:
      return state;
  }
};

export default orderReducer;
