import React from "react";

import { ActionTypes, IPerson, MultiStepFormProps } from "@/pages/Delivery/types";
import { useForm } from "react-hook-form";

import Button from "../Button";
import Title from "../Title";

interface PersonFormProps extends MultiStepFormProps {
    actionType: ActionTypes.SET_RECEIVER | ActionTypes.SET_SENDER;
}

const PersonForm = ({ actionType, dispatch, nextMenu, prevMenu, title, state }: PersonFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IPerson>({
        mode: "all",
        defaultValues: {
            firstname: "",
            lastname: "",
            middlename: "",
            phone: "",
        }
    });

    React.useEffect(() => {
        reset({
            middlename: (state[state.menu.value as keyof typeof state] as IPerson)?.middlename ?? "",
            firstname: (state[state.menu.value as keyof typeof state] as IPerson)?.firstname ?? "",
            lastname: (state[state.menu.value as keyof typeof state] as IPerson)?.lastname ?? "",
            phone: (state[state.menu.value as keyof typeof state] as IPerson)?.phone ?? "",
        })
    }, [state])

    const onSubmit = (data: IPerson) => {
        dispatch({ type: actionType, payload: data });
        dispatch({ type: ActionTypes.SET_MENU, payload: { value: state.menu.fromCheckout ? "checkout" : nextMenu } });
    };

    return (
        <div className="flex flex-col gap-5 h-[calc(100vh-80px)] pt-12">
            <Title title={title} className="font-bold" />
            <form className="flex flex-col h-full pb-5 gap-5 max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
                <label className="relative flex flex-col gap-4">
                    <span>Фамилия</span>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("lastname", {
                            required: "Обязательное поле",
                        })}
                    />
                    {errors?.lastname && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.lastname?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Имя</span>
                    <input
                        type="text"
                        placeholder="Имя"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("firstname", {
                            required: "Обязательное поле",
                        })}
                    />
                    {errors?.firstname && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.firstname?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Отчество</span>
                    <input
                        type="text"
                        placeholder="Отчество (при наличии)"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("middlename")}
                    />
                </label>
                <label className="relative flex flex-col gap-4">
                    <span>Номер телефона</span>
                    <input
                        type="tel"
                        placeholder="телефон"
                        className="border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                        {...register("phone", {
                            required: "Обязательное поле",
                            pattern: {
                                value: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                                message: "Некорректный формат номера",
                            },
                        })}
                    />
                    {errors?.phone && (
                        <span className="text-red-500 absolute -bottom-6 text-sm">
                            {errors.phone?.message?.toString() || "Некорректное значение"}
                        </span>
                    )}
                </label>
                <div className="flex items-center mt-10 gap-6 justify-between">
                    {prevMenu && (
                        <Button
                            type="button"
                            size="md"
                            fullWidth
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

export default PersonForm;