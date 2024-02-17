import React from "react";

import { useAppDispatch } from "../index";
import { toast } from "react-hot-toast";

import { api } from "@/utils/api";
import { ApiError } from "@/utils/api/error";

import { signIn } from "@/utils/redux/user/slice";

export const useAuth = () => {
    const [step, setStep] = React.useState(0);
    const [phone, setPhone] = React.useState<string | null>(null);
    const [retryDelay, setRetryDelay] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(false);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!retryDelay) return;

        const id = setTimeout(() => {
            setRetryDelay((prevState) => {
                return prevState! <= 0 ? null : prevState! - 1000;
            });
        }, 1000);

        return () => clearTimeout(id);
    }, [retryDelay]);

    const onOTPSend = React.useCallback(async ({ phone }: Record<string, string>) => {
        try {
            setLoading(true);

            const { retryDelay } = await api.user.sendOTPRequest({ body: JSON.stringify({ phone }) });

            setRetryDelay(Number(retryDelay));
            setStep(1);
            setPhone(phone);
        } catch (error) {
            console.error(error);
            error instanceof ApiError && toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const onOTPSubmit = React.useCallback(async ({ phone, pin }: Record<string, string>) => {
        try {
            setLoading(true);

            const result = await api.user.signIn({ body: JSON.stringify({ phone, code: pin }) });

            dispatch(signIn(result));
        } catch (error) {
            console.error(error);
            error instanceof ApiError && toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { step, phone, retryDelay, loading, onOTPSend, onOTPSubmit, setStep };
};