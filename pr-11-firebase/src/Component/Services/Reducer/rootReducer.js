import { combineReducers } from "redux";
import { AddProductRedux } from "./AddProductReducer";
import { userReducer } from "./userReducer";


export const rootreducer = combineReducers({
    AddProductRedux,
    userReducer
})