import React from "react";

import { useAppSelector } from "..";
import { useParams } from "react-router-dom";

import { api } from "@/utils/api";
import { IOrder } from "@/utils/api/types";

import { selectToken } from "@/utils/redux/user/slice";

export const useDetailedOrderInfo = () => {
    const token = useAppSelector(selectToken) as string;

    const { id } = useParams() as { id: string };

    const [status, setStatus] = React.useState<"loading" | "error" | "success">("loading");
    const [order, setOrder] = React.useState<IOrder | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const { order } = await api.user.getDetailedOrderInfo({ id, token });

                setOrder(order);
                setStatus("success");
            } catch (error) {
                setStatus("error");
                console.error(error);
            }
        })();
    }, []);

    return { status, order, token };
};