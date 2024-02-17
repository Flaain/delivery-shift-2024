import { API } from "../api";

import { IOption } from "@/utils/redux/calculator/types";

import { IApiMethodParams } from "../types";

export class CalcAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    async getOptions<T extends string>({ signal, body }: Pick<IApiMethodParams<T>, "body" | "signal">) {
        const response = await fetch(this._baseUrl + "delivery/calc", {
            signal,
            body,
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        return this._checkResponse<Array<IOption>, "options">(response);
    }
}