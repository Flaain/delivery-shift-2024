import { ApiError } from "./error";
import { IApiData, IBase } from "./types";

export class API {
    protected _baseUrl: string;
    protected _headers: IBase["headers"];

    constructor({ baseUrl, headers }: IBase) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    protected async _checkResponse<T, K extends string>(response: Response): Promise<IApiData<T, K>> {
        const data = await response.json();

        if (!response.ok)
            throw new ApiError({ ...data, message: data.error ?? "Произошла непредвиденная ошибка" });

        return data;
    }
}