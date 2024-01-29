import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";

export const appStore = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof appStore.getState>;
export type StoreDispatch = typeof appStore.dispatch;