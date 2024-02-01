import { PayloadAction } from "@reduxjs/toolkit";
import { buildCreateSlice } from "@reduxjs/toolkit/react";
import { asyncThunkCreator } from "@reduxjs/toolkit";

import { ICalculatorData, ICalculatorInitialState, IPoint } from "./types";
import { api } from "@/utils/api";
import { ApiError } from "@/utils/api/error";

const createSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } });

const initialState: ICalculatorInitialState = {
    points: [],
    packages: [],
    to: null,
    from: null,
    status: 'none',
    packageDetails: null,
    error: null,
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: (create) => ({
        getCalculatorData: create.asyncThunk(async (controller: AbortController) => {
            const [{ points }, { packages }] = await Promise.all([api.getPoints({ signal: controller.signal }), api.getPackages({ signal: controller.signal })]);
            return { points, packages };
        },
        {
            pending: (state) => {
                state.status = 'loading';
            },
            fulfilled: (state, { payload }: PayloadAction<ICalculatorData>) => {
                state.points = payload.points;
                state.packages = payload.packages;
                state.from = payload.points[0];
                state.to = payload.points[1];
                state.status = 'success'
            },
            rejected: (state, { payload }: PayloadAction<unknown>) => {
                // не могу понять почему при rejected, payload === undefined. Возможно что-то неправильно в API классе где я ошибку выкидываю
                if (payload instanceof ApiError) { 
                    state.error = payload.message;
                    state.status = 'error';
                }
            }
        }),
        setFrom: create.reducer((state, { payload }: PayloadAction<IPoint>) => {
            state.from = payload;
        }),
        setTo: create.reducer((state, { payload }: PayloadAction<IPoint>) => {
            state.to = payload;
        }),
    }),
    selectors: {
        selectSlice: (state) => state,
        selectPoints: (state) => state.points,
    },
});

export const { getCalculatorData, setFrom, setTo } = calculatorSlice.actions;
export const { selectSlice, selectPoints } = calculatorSlice.selectors;