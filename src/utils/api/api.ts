import { IPackage, IPoint } from "../redux/calculator/types";
import { ApiError } from "./error";
import { IApiData, IApiMethodParams, IBase } from "./types";

export class API {
    private _baseUrl: string;

    constructor({ baseUrl }: IBase) {
        this._baseUrl = baseUrl;
    }

    private async _checkResponse<T, K extends string>(response: Response, endpoint: string): Promise<IApiData<T, K>> {
        const data = await response.json();

        if (!response.ok) throw new ApiError({ message: "Не удалось получить данные", ...data, endpoint });
        // решил добавить заглушку для "message" на всякий случай

        return data;
    }

    async getPoints<T>({ endpoint = "delivery/points", signal }: IApiMethodParams<T>) {
        const response = await fetch(this._baseUrl + endpoint, { signal });
        return this._checkResponse<Array<IPoint>, "points">(response, endpoint);
    }

    async getPackages<T>({ endpoint = "delivery/package/types", signal }: IApiMethodParams<T>) {
        const response = await fetch(this._baseUrl + endpoint, { signal });
        return this._checkResponse<Array<IPackage>, "packages">(response, endpoint);
    }
}