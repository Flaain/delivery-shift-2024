export interface IPoint {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface IPackage {
    id: number;
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
}

export type Status = "none" | "loading" | "success" | "error"; 

export interface IOption {
    id: string;
    price: number;
    days: number;
    name: string;
    type: string;
}

export interface ICalculatorInitialState {
    points: Array<IPoint>;
    senderPoint: null | IPoint;
    receiverPoint: null | IPoint;
    options: Array<IOption>;
    packages: Array<IPackage>;
    packageProp: null | Partial<IPackage>;
    status: Status;
    error: null | string;
}

export interface ICalculatorData {
    points: Array<IPoint>;
    packages: Array<IPackage>;
}