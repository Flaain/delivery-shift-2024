import { RegisterOptions } from "react-hook-form";

export const authForm: Record<"phone" | "pin", RegisterOptions> = {
    phone: {
        required: "Обязательное поле",
        pattern: {
            value: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
            message: "Некорректный формат номера",
        },
    },
    pin: {
        required: "Обязательное поле",
        pattern: { value: /^[0-9]+$/, message: "Допустимы только цифры" },
    },
};