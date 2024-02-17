import React from "react";

import { reducer } from "./reducer";
import { ActionTypes, DeliveryInitialState } from "./types";
import { Navigate } from "react-router-dom";

import { api } from "@/utils/api";

import { ROUTES } from "@/utils/constants/router";
import { useAppSelector } from "@/utils/hooks";
import { selectSlice } from "@/utils/redux/calculator/slice";

import AddressForm from "@/components/AddressForm";
import Checkout from "@/components/Checkout";
import Container from "@/components/Container";
import DeliveryMethod from "@/components/DeliveryMethod";
import PayerForm from "@/components/PayerForm";
import PersonForm from "@/components/PersonForm";
import Spinner from "@/components/Spinner";

const intialState: DeliveryInitialState = {
    options: [],
    option: null,
    loading: true,
    hasError: false,
    receiver: null,
    sender: null,
    receiverAddress: null,
    senderAddress: null,
    total: null,
    payer: null,
    menu: { value: "method" },
};

const Delivery = () => {
    const { packageProp, receiverPoint, senderPoint } = useAppSelector(selectSlice);

    const [state, dispatch] = React.useReducer(reducer, intialState);

    const isAllFilled = packageProp && receiverPoint && senderPoint;

    React.useEffect(() => {
        (async () => {
            try {
                if (!isAllFilled) return;

                const { options } = await api.calc.getOptions({ body: JSON.stringify({ package: packageProp, senderPoint, receiverPoint }) });

                dispatch({ type: ActionTypes.SET_OPTIONS, payload: options });
            } catch (error) {
                console.error(error);
                dispatch({ type: ActionTypes.SET_HAS_ERROR, payload: true });
            } finally {
                dispatch({ type: ActionTypes.SET_LOADING, payload: false });
            }
        })();
    }, []);

    if (!isAllFilled) return <Navigate to={ROUTES.HOME} replace />;

    const menus: Record<string, React.ReactNode> = {
        method: <DeliveryMethod dispatch={dispatch} options={state.options} state={state} title="Способ отправки" />,
        receiver: (
            <PersonForm
                dispatch={dispatch}
                nextMenu="sender"
                prevMenu="method"
                title="Получатель"
                state={state}
                actionType={ActionTypes.SET_RECEIVER}
            />
        ),
        sender: (
            <PersonForm
                dispatch={dispatch}
                nextMenu="senderAddress"
                prevMenu="receiver"
                title="Отправитель"
                state={state}
                actionType={ActionTypes.SET_SENDER}
            />
        ),
        senderAddress: (
            <AddressForm
                dispatch={dispatch}
                nextMenu="receiverAddress"
                prevMenu="sender"
                state={state}
                title="Откуда забрать"
                actionType={ActionTypes.SET_SENDER_ADDRESS}
            />
        ),
        receiverAddress: (
            <AddressForm
                dispatch={dispatch}
                nextMenu="payer"
                prevMenu="senderAddress"
                state={state}
                title="Куда доставить"
                actionType={ActionTypes.SET_RECEIVER_ADDRESS}
            />
        ),
        payer: <PayerForm dispatch={dispatch} state={state} title="Оплата доставки" />,
        checkout: <Checkout dispatch={dispatch} state={state} title="Проверка данных заказа" />,
    };

    return (
        <Container className="px-4">
            {state.loading ? <Spinner /> : state.hasError ? <div>Что-то пошло не так</div> : menus[state.menu.value]}
        </Container>
    );
};

export default Delivery;