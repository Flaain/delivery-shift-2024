import { IOrder } from "@/utils/api/types";

import { getFullAddressString } from "@/utils/helpers/getFullAddressString";
import { getFullNameString } from "@/utils/helpers/getFullNameString";

import CheckoutBlock from "../CheckoutBlock";

const DetailedOrderInfoList = ({ order }: { order: IOrder }) => {
    return (
        <ul className="flex flex-col gap-6">
            <li>
                <CheckoutBlock
                    title="Получатель"
                    description={[
                        { name: "ФИО", value: getFullNameString(order.receiver) },
                        { name: "Телефон", value: order.receiver.phone },
                    ]}
                />
            </li>
            <li>
                <CheckoutBlock
                    title="Отправитель"
                    description={[
                        { name: "ФИО", value: getFullNameString(order.sender) },
                        { name: "Телефон", value: order.sender.phone },
                    ]}
                />
            </li>
            <li>
                <CheckoutBlock
                    title="Откуда забрать"
                    description={[
                        { name: "Адрес", value: getFullAddressString(order.senderAddress) },
                        ...(order.senderAddress.comment
                            ? [{ name: "Заметка", value: order.senderAddress.comment }]
                            : []),
                    ]}
                />
            </li>
            <li>
                <CheckoutBlock
                    title="Куда доставить"
                    description={[
                        { name: "Адрес", value: getFullAddressString(order.receiverAddress) },
                        ...(order.receiverAddress.comment
                            ? [{ name: "Заметка", value: order.receiverAddress.comment }]
                            : []),
                    ]}
                />
            </li>
        </ul>
    );
};

export default DetailedOrderInfoList;