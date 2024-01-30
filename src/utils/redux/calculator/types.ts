export interface IPoint {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export type Status = "none" | "loading" | "success" | "error"; 

export interface ICalculatorInitialState {
    points: Array<IPoint>;
    status: Status;
    error: null | string;
}