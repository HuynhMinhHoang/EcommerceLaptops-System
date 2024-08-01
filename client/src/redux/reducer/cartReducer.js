const initialState = {
  items: [],
  isShowNotifications: false,
  infoProductAdd: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // console.log("ADD_TO_CART", action.payload);
      return {
        ...state,
        items: [...state.items, action.payload],
        isShowNotifications: true,
        infoProductAdd: action.payload,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        isShowNotifications: false,
        infoProductAdd: null,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
