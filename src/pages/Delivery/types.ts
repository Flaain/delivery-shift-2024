import { IOption } from "@/utils/redux/calculator/types";

type Statuses = "error" | "loading" | "success" | "none";

export interface MultiStepFormProps {
    dispatch: React.Dispatch<Action>;
    prevMenu?: string;
    title: string;
    state: DeliveryInitialState;
    nextMenu: string;
}

export interface IPerson {
    firstname: string;
    lastname: string;
    middlename?: string;
    phone: string;
}

export interface ILocation {
    street: string;
    house: string;
    appartament: string;
    comment?: string;
}

export interface DeliveryInitialState {
    options: Array<IOption>;
    loading: boolean;
    hasError: boolean;
    option: null | IOption;
    receiver: null | IPerson;
    sender: null | IPerson;
    senderAddress: null | ILocation;
    receiverAddress: null | ILocation;
    payer: null | "RECEIVER" | "SENDER";
    total: null | number;
    menu: IMenu;
}

export interface IMenu {
    value: string;
    fromCheckout?: boolean;
}

export enum ActionTypes {
    SET_OPTIONS = "SET_OPTIONS",
    SET_OPTION = "SET_OPTION",
    SET_HAS_ERROR = "SET_HAS_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_RECEIVER = "SET_RECEIVER",
    SET_SENDER = "SET_SENDER",
    SET_RECEIVER_ADDRESS = "SET_RECEIVER_ADDRESS",
    SET_SENDER_ADDRESS = "SET_SENDER_ADDRESS",
    SET_TOTAL = "SET_TOTAL",
    SET_PAYER = "SET_PAYER",
    SET_MENU = "SET_MENU",
    SET_STATUS = "SET_STATUS",
}

export type Action =
    | { type: ActionTypes.SET_OPTIONS; payload: Array<IOption> }
    | { type: ActionTypes.SET_OPTION; payload: IOption }
    | { type: ActionTypes.SET_LOADING; payload: boolean }
    | { type: ActionTypes.SET_HAS_ERROR; payload: boolean }
    | { type: ActionTypes.SET_SENDER_ADDRESS; payload: ILocation }
    | { type: ActionTypes.SET_RECEIVER_ADDRESS; payload: ILocation }
    | { type: ActionTypes.SET_MENU; payload: IMenu }
    | { type: ActionTypes.SET_RECEIVER; payload: IPerson }
    | { type: ActionTypes.SET_SENDER; payload: IPerson }
    | { type: ActionTypes.SET_TOTAL; payload: number }
    | { type: ActionTypes.SET_PAYER; payload: "SENDER" | "RECEIVER" };