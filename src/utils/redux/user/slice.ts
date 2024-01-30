import { asyncThunkCreator } from "@reduxjs/toolkit";
import { UserinitialState } from "./types";
import { buildCreateSlice } from "@reduxjs/toolkit/react";

const createSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } });

const initialState: UserinitialState = {
    jwt: null,
    name: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: (create) => ({
        logout: create.reducer((state, action) => {
            console.log("logout");
        })
    }),
    selectors: {
        selectSlice: (state) => state,
        selectJWT: (state) => state.jwt,
        selectName: (state) => state.name,
    },
});

export const { logout } = userSlice.actions;
export const { selectSlice, selectJWT, selectName } = userSlice.selectors;