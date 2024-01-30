export interface IBase {
    baseUrl: string;
    headers?: Headers;
}

export type IApiData<T, K extends string> = {
    [key in K]: T;
} & {
    success: boolean;
};

export interface IApiMethodParams<T> {
    endpoint: string;
    signal?: AbortSignal;
    body?: T;
    headers?: Headers;
    method?: string;
}