import { ICalculatorData, ICalculatorInitialState, IPackage, IPoint } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { asyncThunkCreator } from "@reduxjs/toolkit";
import { buildCreateSlice } from "@reduxjs/toolkit/react";

import { api } from "@/utils/api";
import { ApiError } from "@/utils/api/error";

const initialState: ICalculatorInitialState = {
    points: [],
    options: [],
    packages: [],
    status: "none",
    senderPoint: null,
    receiverPoint: null,
    packageProp: null,
    error: null,
};

export const calculatorSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })({
    name: "calculator",
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        getCalculatorData: asyncThunk(
            async (controller: AbortController) => {
                const [{ points }, { packages }] = await Promise.all([
                    api.base.getPoints({ signal: controller.signal }),
                    api.base.getPackages({ signal: controller.signal }),
                ]);

                return { points, packages };
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, { payload }: PayloadAction<ICalculatorData>) => {
                    state.points = payload.points;
                    state.packages = payload.packages;
                    state.status = "success";
                },
                rejected: (state, { payload }: PayloadAction<unknown>) => {
                    if (payload instanceof ApiError) {
                        state.error = payload.message;
                        state.status = "error";
                    }
                },
            },
        ),
        setSenderPoint: reducer((state, { payload }: PayloadAction<IPoint>) => {
            state.senderPoint = payload;
        }),
        setReceiverPoint: reducer((state, { payload }: PayloadAction<IPoint>) => {
            state.receiverPoint = payload;
        }),
        setPackage: reducer((state, { payload }: PayloadAction<Partial<IPackage>>) => {
            state.packageProp = payload;
        }),
    }),
    selectors: {
        selectSlice: (state) => state,
        selectPoints: (state) => state.points,
    },
});

export const { getCalculatorData, setReceiverPoint, setSenderPoint, setPackage } = calculatorSlice.actions;
export const { selectSlice, selectPoints } = calculatorSlice.selectors;