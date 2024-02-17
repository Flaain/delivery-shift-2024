import { api } from "@/utils/api";
import { IApiData, ISignIn } from "@/utils/api/types";
import { PayloadAction, asyncThunkCreator } from "@reduxjs/toolkit";
import { buildCreateSlice } from "@reduxjs/toolkit/react";

import { UserinitialState } from "./types";

const initialState: UserinitialState = {
    _id: null,
    token: null,
    isAuthInProgress: true,
    name: null,
    phone: null,
    isAuth: false,
};

export const userSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })({
    name: "user",
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        logout: reducer((state) => {
            Object.assign(state, { ...initialState, isAuthInProgress: false });

            localStorage.removeItem("token");
        }),
        getSession: asyncThunk(async (token: string | null, { fulfillWithValue }) => {
            if (!token) throw new Error("Cannot get session without token");

            const { user } = await api.user.getSession({ token });

            return fulfillWithValue({ user, token });
        },
        {
            fulfilled: (state, { payload }) => {
                Object.assign(state, { ...payload.user, token: payload.token, isAuth: true });
            },
            rejected: (state) => {
                state.isAuth = false;
            },
            settled: (state) => {
                state.isAuthInProgress = false;
            },
        }),
        signIn: reducer((state, { payload }: PayloadAction<IApiData<ISignIn, "user">>) => {
            Object.assign(state, { ...payload.user, isAuth: true, isAuthInProgress: false, token: payload.token });
            localStorage.setItem("token", payload.token!);
        }),
    }),
    selectors: {
        selectSlice: (state) => state,
        selectToken: (state) => state.token,
    },
});

export const { logout, getSession, signIn } = userSlice.actions;
export const { selectSlice, selectToken } = userSlice.selectors;
