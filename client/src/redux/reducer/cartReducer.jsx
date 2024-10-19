const initialState = {
  products: [],
  isShowNotifications: false,
  infoProductAdd: null,
  isLoadingRemove: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) => p.idProduct === product.idProduct
      );

      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((p) =>
            p.idProduct === product.idProduct
              ? { ...p, quantityInCart: p.quantityInCart + 1 }
              : p
          ),
          isShowNotifications: true,
          infoProductAdd: product,
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...product, quantityInCart: 1 }],
          isShowNotifications: true,
          infoProductAdd: product,
        };
      }
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        isShowNotifications: false,
        infoProductAdd: null,
      };
    case "CLEAR_CART":
      return {
        ...state,
        products: [],
      };
    case "REMOVE_FROM_CART_START":
      return {
        ...state,
        isLoadingRemove: true,
      };
    case "REMOVE_FROM_CART_SUCCESS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.idProduct !== action.payload
        ),
        isLoadingRemove: false,
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.idProduct === action.payload
            ? { ...product, quantityInCart: product.quantityInCart + 1 }
            : product
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.idProduct === action.payload
            ? { ...product, quantityInCart: product.quantityInCart - 1 }
            : product
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
