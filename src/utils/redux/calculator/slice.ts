import { PayloadAction } from "@reduxjs/toolkit";
import { buildCreateSlice } from "@reduxjs/toolkit/react";
import { asyncThunkCreator } from "@reduxjs/toolkit";

import { ICalculatorInitialState, IPoint } from "./types";
import { api } from "@/utils/api";
import { ApiError } from "@/utils/api/error";

const createSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } });

const initialState: ICalculatorInitialState = {
    points: [],
    status: 'none',
    error: null,
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: (create) => ({
        getPoints: create.asyncThunk(async (controller: AbortController, { rejectWithValue }) => {
            try {
                const { points } = await api.getPoints({ endpoint: "delivery/points", signal: controller.signal });
                return points;
            } catch (error) {
                !(error instanceof DOMException) && console.error(error);
                return rejectWithValue((error as ApiError).message); // <-- сомнительно, но окээээй...
                /* сделал так, потому что редакс жалуется, если вернуть весь объект error - "A non-serializable value was detected in an action" */
            }
        },
        {
            pending: (state) => {
                state.status = 'loading';
            },
            fulfilled: (state, { payload }: PayloadAction<Array<IPoint>>) => {
                state.points = payload;
                state.status = 'success'
            },
            rejected: (state, { payload }: PayloadAction<unknown>) => {
                state.status = 'error';
                payload instanceof ApiError && (state.error = payload.message);
            },
            settled: (state) => {
                state.status = 'none';
            }
        }),
    }),
    selectors: {
        selectSlice: (state) => state,
        selectPoints: (state) => state.points,
    },
});

export const { getPoints } = calculatorSlice.actions;
export const { selectSlice, selectPoints } = calculatorSlice.selectors;