import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./api-slice";
import productReducer from "./product-slice";
import { combineReducers } from "redux";

const reducer = combineReducers({ api: apiReducer, product: productReducer });
const store = configureStore({
  reducer: reducer,
});

export default store;
