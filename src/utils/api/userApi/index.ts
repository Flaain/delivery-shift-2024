import { API } from "../api";

import {
    ICancelOrderParams,
    IDetailedOrderParams,
    IGetOrdersParams,
    IGetSessionParams,
    IOrder,
    ISession,
    ISignIn,
    SignalWithBody,
} from "../types";

export class UserAPI extends API {
    constructor() {
        super({ baseUrl: import.meta.env.VITE_BASE_URL, headers: { "Content-Type": "application/json" } });
    }

    async getSession<T>({ signal, token }: IGetSessionParams<T>) {
        const response = await fetch(this._baseUrl + "users/session", {
            signal,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        return this._checkResponse<ISession, "user">(response);
    }

    async sendOTPRequest<T extends string>({ signal, body }: SignalWithBody<T>) {
        const response = await fetch(this._baseUrl + "auth/otp", {
            signal,
            headers: this._headers,
            body,
            method: "POST",
        });
        return this._checkResponse<T, "retryDelay">(response);
    }

    async signIn<T extends string>({ signal, body }: SignalWithBody<T>) {
        const response = await fetch(this._baseUrl + "users/signin", {
            signal,
            headers: this._headers,
            body,
            method: "POST",
        });
        return this._checkResponse<ISignIn, "user">(response);
    }

    async makeOrder<T extends string>({ signal, body }: SignalWithBody<T>) {
        const response = await fetch(this._baseUrl + "delivery/order", {
            signal,
            headers: this._headers,
            body,
            method: "POST",
        });
        return this._checkResponse<Array<IOrder>, "orders">(response);
    }

    async getOrders<T extends string>({ signal, token }: IGetOrdersParams<T>) {
        const response = await fetch(this._baseUrl + "delivery/orders", {
            signal,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        return this._checkResponse<Array<IOrder>, "orders">(response);
    }

    async getDetailedOrderInfo<T>({ signal, id, token }: IDetailedOrderParams<T>) {
        const response = await fetch(this._baseUrl + "delivery/orders/" + id, {
            signal,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        return this._checkResponse<IOrder, "order">(response);
    }

    async cancelOrder<T extends string>({ signal, token, body }: ICancelOrderParams<T>) {
        const response = await fetch(this._baseUrl + "delivery/orders/cancel", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body,
            signal,
        });

        return this._checkResponse(response);
    }
}