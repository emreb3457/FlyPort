import { combineReducers } from "redux";
import { talepReducer } from "./talepReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    user: userReducer,
    talep: talepReducer
});