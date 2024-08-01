export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  });

  setTimeout(() => {
    dispatch({ type: "HIDE_NOTIFICATION" });
    console.log("HIDE_NOTIFICATION");
  }, 3000);
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
};
