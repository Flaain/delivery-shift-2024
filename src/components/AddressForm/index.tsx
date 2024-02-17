import { MultiStepFormProps } from "@/pages/Delivery/types";
import { ActionTypes, ILocation } from "@/pages/Delivery/types";
import { useForm } from "react-hook-form";

import Button from "../Button";
import Title from "../Title";
import React from "react";

interface AddressFormProps extends MultiStepFormProps {
    actionType: ActionTypes.SET_SENDER_ADDRESS | ActionTypes.SET_RECEIVER_ADDRESS;
}

const AddressForm = ({ dispatch, nextMenu, prevMenu, title, state, actionType }: AddressFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ILocation>({
        mode: "all",
        defaultValues: {
            appartament: "",
            house: "",
            comment: "",
            street: ""
        },
    });

    React.useEffect(() => {
        reset({
            appartament: (state[state.menu.value as keyof typeof state] as ILocation)?.appartament ?? "",
            house: (state[state.menu.value as keyof typeof state] as ILocation)?.house ?? "",
            comment: (state[state.menu.value as keyof typeof state] as ILocation)?.comment ?? "",
            street: (state[state.menu.value as keyof typeof state] as ILocation)?.street ?? "",
        })
    }, [state])

    const onSubmit = (data: ILocation) => {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ActionTypes.SET_MENU, payload: { value: state.menu.fromCheckout ? "checkout" : nextMenu } });
    };

    return (
        <div className="flex flex-col gap-5 h-[calc(100vh-80px)] pt-12">
            <Title title={title} className="font-bold" />
            <form className="flex flex-col h-full pb-5 gap-5 max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
                <label className="relative flex flex-col gap-4">
                    <span>Улица</span>
                    <input
                        type="text"
                        placeholder="Улица"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("street", {
                            required: "Обязательное поле",
                        })}
                    />
                    {errors?.street && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.street?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Номер дома</span>
                    <input
                        type="number"
                        placeholder="Дом"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("house", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Введите число",
                            },
                        })}
                    />
                    {errors?.house && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.house?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Номер квартиры</span>
                    <input
                        type="number"
                        placeholder="Квартира"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("appartament", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Введите число",
                            },
                        })}
                    />
                    {errors?.appartament && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.appartament?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Заметка</span>
                    <input
                        type="text"
                        placeholder="заметка для курьера"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("comment")}
                    />
                </label>
                <div className="flex items-center mt-10 gap-6 justify-between">
                    {prevMenu && (
                        <Button
                            size="md"
                            fullWidth
                            type="button"
                            title="Назад"
                            isBordered
                            isRoundedFull
                            onClick={() =>
                                dispatch({
                                    type: ActionTypes.SET_MENU,
                                    payload: { value: prevMenu, fromCheckout: false },
                                })
                            }
                        />
                    )}
                    <Button
                        type="submit"
                        size="md"
                        fullWidth
                        title="Продолжить"
                        isFilled
                        isRoundedFull
                        isDisabled={!isValid}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddressForm;