import { MultiStepFormProps } from "@/pages/Delivery/types";
import { ActionTypes } from "@/pages/Delivery/types";

import { cn } from "@/utils/helpers/classnames";
import { getImageUrl } from "@/utils/helpers/getImageUrl";

import Button from "../Button";
import Title from "../Title";

const PayerForm = ({ dispatch, state, title }: Omit<MultiStepFormProps, "prevMenu" | "nextMenu">) => {
    return (
        <div className="flex flex-col gap-5 pt-12">
            <Title title={title} className="font-bold" />
            <form className="max-w-[500px] w-full">
                <ul className="flex flex-col gap-2">
                    <li>
                        <label className="pl-9 relative flex gap-4">
                            <span className="text-lg text-primary-t">Получатель</span>
                            <div
                                className={cn(
                                    "absolute left-0 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out",
                                    state.payer === "RECEIVER"
                                        ? "bg-primary-blue"
                                        : "border border-solid border-gray-200",
                                )}
                            >
                                {state.payer && <img src={getImageUrl("check.svg")} alt="подтвержено" />}
                            </div>
                            <input
                                type="radio"
                                className="sr-only"
                                checked={state.payer === "RECEIVER"}
                                onChange={() => dispatch({ type: ActionTypes.SET_PAYER, payload: "RECEIVER" })}
                            />
                        </label>
                    </li>
                    <li>
                        <label className="pl-9 relative flex gap-4">
                            <span className="text-lg text-primary-t">Отправитель</span>
                            <div
                                className={cn(
                                    "absolute left-0 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full flex items-center justify-center",
                                    state.payer === "SENDER"
                                        ? "bg-primary-blue"
                                        : "border border-solid border-gray-200",
                                )}
                            >
                                {state.payer && <img src={getImageUrl("check.svg")} alt="подтвержено" />}
                            </div>
                            <input
                                type="radio"
                                className="sr-only"
                                checked={state.payer === "SENDER"}
                                onChange={() => dispatch({ type: ActionTypes.SET_PAYER, payload: "SENDER" })}
                            />
                        </label>
                    </li>
                </ul>
                <div className="flex items-center mt-10 gap-6">
                    <Button
                        fullWidth
                        size="md"
                        type="button"
                        title="Назад"
                        isBordered
                        isRoundedFull
                        onClick={() => dispatch({ type: ActionTypes.SET_MENU, payload: { value: "receiverAddress", fromCheckout: false } })}
                    />
                    <Button
                        fullWidth
                        size="md"
                        type="submit"
                        title="Продолжить"
                        isFilled
                        isRoundedFull
                        onClick={() => dispatch({ type: ActionTypes.SET_MENU, payload: { value: "checkout" } })}
                        isDisabled={!state.payer}
                    />
                </div>
            </form>
        </div>
    );
};

export default PayerForm;
