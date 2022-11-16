import { combineReducers } from "@reduxjs/toolkit";
import manufacturers from "./manufacturers";
import products from "./products";

export default combineReducers({
    products,
    manufacturers
});