import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  userRedux: userReducer,
  cartRedux: cartReducer,
  orderRedux: orderReducer,
});

export default rootReducer;
