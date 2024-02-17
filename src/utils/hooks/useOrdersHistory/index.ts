import React from "react";

import { useAppSelector } from "../index";

import { api } from "@/utils/api";
import { IOrder } from "@/utils/api/types";

import { selectToken } from "@/utils/redux/user/slice";

export const useOrdersHistory = () => {
    const token = useAppSelector(selectToken) as string;

    const [orders, setOrders] = React.useState<Array<IOrder>>([]);
    const [loading, setLoading] = React.useState(false);

    const revalidateOrders = React.useCallback(async () => {
        try {
            setLoading(true);

            const { orders } = await api.user.getOrders({ token });

            setOrders(orders);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    React.useEffect(() => { revalidateOrders() }, []);


    return { loading, orders, revalidateOrders };
};