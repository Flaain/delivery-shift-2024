import { asyncThunkCreator } from "@reduxjs/toolkit";
import { initialState } from "./types";
import { buildCreateSlice } from "@reduxjs/toolkit/react";

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } });

const initialState: initialState = {
    jwt: null,
    name: null,
};

export const userSlice = createSliceWithThunks({
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