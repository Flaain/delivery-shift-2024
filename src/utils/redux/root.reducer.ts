import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer
}); // на 30.01.2024 пока не допер как использовать combineSlices, но выглядит прикольно