import { Action, ActionTypes, DeliveryInitialState } from "./types";

export const reducer = (store: DeliveryInitialState, { type, payload }: Action) => {
    switch (type) {
        case ActionTypes.SET_OPTION:
            return {
                ...store,
                option: payload,
                total: Math.floor(payload.price / 100),
            };
        case ActionTypes.SET_OPTIONS:
            return {
                ...store,
                options: payload,
            };
        case ActionTypes.SET_SENDER_ADDRESS:
            return {
                ...store,
                senderAddress: payload,
            };
        case ActionTypes.SET_LOADING:
            return {
                ...store,
                loading: payload,
            };
        case ActionTypes.SET_HAS_ERROR:
            return {
                ...store,
                hasError: payload,
            }
        case ActionTypes.SET_RECEIVER_ADDRESS:
            return {
                ...store,
                receiverAddress: payload,
            };
        case ActionTypes.SET_MENU:
            return {
                ...store,
                menu: payload,
            };
        case ActionTypes.SET_RECEIVER:
            return {
                ...store,
                receiver: payload,
            };
        case ActionTypes.SET_SENDER:
            return {
                ...store,
                sender: payload,
            };
        case ActionTypes.SET_TOTAL:
            return {
                ...store,
                total: Number(store.total) + payload,
            };
        case ActionTypes.SET_PAYER:
            return {
                ...store,
                payer: payload,
            };
        default:
            return store;
    }
};