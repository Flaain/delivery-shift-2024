import { ILocation, IPerson } from "@/pages/Delivery/types";

import { IPoint } from "../redux/calculator/types";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type OnlySignal<T> = Pick<IApiMethodParams<T>, "signal">;
export type SignalWithBody<T> = WithRequired<Pick<IApiMethodParams<T>, "body" | "signal">, "body">;

export interface IBase {
    baseUrl: string;
    headers: {
        "Content-Type"?: "application/json" | (string & {});
        Authorization?: "Bearer" | (string & {});
    };
}

export type IApiData<T, K extends string> = {
    [key in K]: T;
} & {
    success: boolean;
    token?: string;
};

export interface IApiMethodParams<T> extends Partial<Omit<IBase, "baseUrl">> {
    endpoint?: string;
    signal?: AbortSignal;
    body?: T;
    method?: string;
}

export interface ISession {
    _id: string;
    phone: string;
}

export interface ISignIn {
    phone: string;
    _id: string;
}

export interface IDetailedOrderParams<T extends any> extends OnlySignal<T> {
    id: string;
    token: string;
}

export interface IGetOrdersParams<T extends any> extends OnlySignal<T> {
    token: string;
}

export interface ICancelOrderParams<T extends any> extends IGetOrdersParams<T>, SignalWithBody<T> {};

export interface IOrder {
    _id: string;
    senderPoint: IPoint;
    senderAddress: ILocation;
    sender: IPerson;
    receiverPoint: IPoint;
    receiverAddress: ILocation;
    receiver: IPerson;
    payer: "SENDER" | "RECEIVER";
    status: number;
    cancellable: boolean;
}

export interface IGetSessionParams<T extends any> extends OnlySignal<T> {
    token: string;
}