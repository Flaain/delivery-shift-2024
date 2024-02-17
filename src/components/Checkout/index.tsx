import React from "react";

import { MultiStepFormProps } from "@/pages/Delivery/types";
import { ActionTypes } from "@/pages/Delivery/types";
import { toast } from "react-hot-toast";

import { api } from "@/utils/api";
import { ApiError } from "@/utils/api/error";

import { ROUTES } from "@/utils/constants/router";
import { declOfNum } from "@/utils/helpers/declOfNum";
import { getFullAddressString } from "@/utils/helpers/getFullAddressString";
import { getFullNameString } from "@/utils/helpers/getFullNameString";
import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { getRelativePrice } from "@/utils/helpers/getRelativePrice";
import { useAppSelector } from "@/utils/hooks";
import { selectSlice } from "@/utils/redux/calculator/slice";

import Button from "../Button";
import CheckoutBlock from "../CheckoutBlock";
import Link from "../Link";
import Modal from "../Modal";
import Title from "../Title";
import { useNavigate } from "react-router-dom";

const Checkout = ({ dispatch, state, title }: Omit<MultiStepFormProps, "prevMenu" | "nextMenu">) => {
    const { senderPoint, receiverPoint } = useAppSelector(selectSlice);

    const [status, setStatus] = React.useState("idle");
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const rightIconSlot = React.useMemo(() => <img src={getImageUrl("pencil.svg")} />, []);

    const navigate = useNavigate();    

    const handleReuqest = async () => {
        try {
            setStatus("loading");

            await api.user.makeOrder({ body: JSON.stringify({ senderPoint, receiverPoint, ...state }) });

            setStatus("success");
            setIsModalOpen(true);
        } catch (error) {
            setStatus("error");
            console.error(error);
            error instanceof ApiError && toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-6 mt-12 mb-8">
            {isModalOpen && (
                <Modal onClose={() => navigate(ROUTES.HOME)}>
                    <div className="flex flex-col gap-3 items-center">
                        <img width={80} height={80} src={getImageUrl("success.svg")} alt="заявка успешно создана" />
                        <h2 className="font-bold text-primary-t text-xl">Заявка отправлена</h2>
                        <p className="text-secondary-t max-w-[250px] text-center">
                            Вы можете оплатить ваш заказ в разделе «Профиль»
                        </p>
                        <Link to={ROUTES.HISTORY} size="md" className="mt-5" isRoundedFull isFilled title="Посмотреть заявку" />
                    </div>
                </Modal>
            )}
            <Title className="font-bold" title={title} />
            <ul className="flex flex-col gap-6">
                {/* TODO: think about how to render this in map */}
                <li>
                    <CheckoutBlock
                        title="Получатель"
                        rightIconSlot={rightIconSlot}
                        description={[
                            { name: "ФИО", value: getFullNameString(state.receiver!) },
                            { name: "Телефон", value: state.receiver!.phone },
                        ]}
                        onClick={() =>
                            dispatch({ type: ActionTypes.SET_MENU, payload: { value: "receiver", fromCheckout: true } })
                        }
                    />
                </li>
                <li>
                    <CheckoutBlock
                        title="Отправитель"
                        rightIconSlot={rightIconSlot}
                        description={[
                            { name: "ФИО", value: getFullNameString(state.sender!) },
                            { name: "Телефон", value: state.sender!.phone },
                        ]}
                        onClick={() =>
                            dispatch({ type: ActionTypes.SET_MENU, payload: { value: "sender", fromCheckout: true } })
                        }
                    />
                </li>
                <li>
                    <CheckoutBlock
                        title="Откуда забрать"
                        rightIconSlot={rightIconSlot}
                        description={[
                            { name: "Адрес", value: getFullAddressString(state.senderAddress!) },
                            ...(state.senderAddress?.comment
                                ? [{ name: "Заметка", value: state.senderAddress?.comment }]
                                : []),
                        ]}
                        onClick={() =>
                            dispatch({
                                type: ActionTypes.SET_MENU,
                                payload: { value: "senderAddress", fromCheckout: true },
                            })
                        }
                    />
                </li>
                <li>
                    <CheckoutBlock
                        title="Куда доставить"
                        rightIconSlot={rightIconSlot}
                        description={[
                            { name: "Адрес", value: getFullAddressString(state.receiverAddress!) },
                            ...(state.receiverAddress?.comment
                                ? [{ name: "Заметка", value: state.receiverAddress?.comment }]
                                : []),
                        ]}
                        onClick={() =>
                            dispatch({
                                type: ActionTypes.SET_MENU,
                                payload: { value: "receiverAddress", fromCheckout: true },
                            })
                        }
                    />
                </li>
            </ul>
            <div className="flex flex-col gap-1 self-end">
                <span className="mb-3 text-primary-t font-bold text-xl">Итого: {getRelativePrice(state.total!)}</span>
                <p className="text-tertiary text-wrap max-w-[300px]">Тариф: {state.option?.name}</p>
                <p className="text-tertiary">
                    Срок: {state.option?.days} {declOfNum(state.option!.days, ["рабочий", "рабочих", "рабочих"])}{" "}
                    {declOfNum(state.option!.days, ["день", "дня", "дней"])}
                </p>
            </div>
            <div className="flex items-center mt-2 gap-6 justify-between">
                <Button
                    className="max-w-[330px]"
                    fullWidth
                    size="md"
                    type="button"
                    title="Назад"
                    isBordered
                    isRoundedFull
                    onClick={() =>
                        dispatch({ type: ActionTypes.SET_MENU, payload: { value: "payer", fromCheckout: true } })
                    }
                />
                <Button
                    type="submit"
                    className="max-w-[330px]"
                    fullWidth
                    size="md"
                    title="Отправить"
                    isFilled
                    isRoundedFull
                    isDisabled={status === "loading" || status === "success"}
                    onClick={handleReuqest}
                />
            </div>
        </div>
    );
};

export default Checkout;