import { API } from "../api";

import { IPackage, IPoint } from "@/utils/redux/calculator/types";

import { IApiMethodParams } from "../types";

export class BaseAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    async getPoints<T>({ signal }: Pick<IApiMethodParams<T>, "signal">) {
        const response = await fetch(this._baseUrl + "delivery/points", { signal });
        return this._checkResponse<Array<IPoint>, "points">(response);
    }

    async getPackages<T>({ signal }: Pick<IApiMethodParams<T>, "signal">) {
        const response = await fetch(this._baseUrl + "delivery/package/types", { signal });
        return this._checkResponse<Array<IPackage>, "packages">(response);
    }
}