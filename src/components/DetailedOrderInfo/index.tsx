import React from "react";

import { IHistoryContextType } from "@/pages/History";

import { api } from "@/utils/api";
import { IOrder } from "@/utils/api/types";

import Button from "../Button";
import DetailedOrderInfoList from "../DetailedOrderInfoList";
import Title from "../Title";

export interface DetailedOrderInfoProps extends IHistoryContextType {
    order: IOrder;
    token: string;
}

const DetailedOrderInfo = ({ order, token, revalidateOrders }: DetailedOrderInfoProps) => {
    const [status, setStatus] = React.useState<"idle" | "loading" | "error" | "success">("idle");

    const cancellable = order.cancellable && order.status !== 4 && order.status !== 3;

    const onCancelOrder = async () => {
        try {
            setStatus("loading");

            api.user.cancelOrder({ token, body: JSON.stringify({ id: order._id }) });

            revalidateOrders();
            setStatus("success");
        } catch (error) {
            console.log(error);
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col gap-5 justify-between">
            {status !== "success" ? (
                <>
                    <DetailedOrderInfoList order={order} />
                    {cancellable && (
                        <Button
                            title="Отменить доставку"
                            isFilled
                            size="md"
                            isRoundedFull
                            isDisabled={status === "loading"}
                            onClick={onCancelOrder}
                        />
                    )}
                </>
            ) : (
                <Title title="Заявка отменена" />
            )}
        </div>
    );
};

export default DetailedOrderInfo;