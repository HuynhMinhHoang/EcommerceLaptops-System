export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  });

  setTimeout(() => {
    dispatch({ type: "HIDE_NOTIFICATION" });
  }, 1000);
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({ type: "REMOVE_FROM_CART_START" });

  setTimeout(() => {
    dispatch({
      type: "REMOVE_FROM_CART_SUCCESS",
      payload: productId,
    });
  }, 500);
};

export const increaseQuantity = (productId) => (dispatch) => {
  dispatch({
    type: "INCREASE_QUANTITY",
    payload: productId,
  });
};

export const decreaseQuantity = (productId) => (dispatch) => {
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: productId,
  });
};
