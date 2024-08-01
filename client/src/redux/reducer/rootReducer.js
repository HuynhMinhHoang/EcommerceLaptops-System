import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer.js";

const rootReducer = combineReducers({
  userRedux: userReducer,
  cartRedux: cartReducer,
});

export default rootReducer;
