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

export interface ICalculatorInitialState {
    points: Array<IPoint>;
    from: null | IPoint;
    to: null | IPoint;
    packages: Array<IPackage>;
    status: Status;
    error: null | string;
    packageDetails: null | Omit<IPackage, "id" | "name">
}

export interface ICalculatorData {
    points: Array<IPoint>;
    packages: Array<IPackage>;
}