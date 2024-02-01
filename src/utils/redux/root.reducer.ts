import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { calculatorSlice } from "./calculator/slice";

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [calculatorSlice.name]: calculatorSlice.reducer,
}); // на 30.01.2024 пока не допер как использовать combineSlices, поэтому решил использовать combineReducers