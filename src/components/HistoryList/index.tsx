import { IOrder } from "@/utils/api/types";

import { orderStatuses } from "@/utils/constants/orderStatuses";
import { getFullAddressString } from "@/utils/helpers/getFullAddressString";

import Link from "../Link";

const HistoryList = ({ orders }: { orders: Array<IOrder> }) => {
    return (
        <ul className="flex flex-col gap-6">
            {orders.map(({ receiverAddress, status, _id }, index) => (
                <li
                    key={_id}
                    className="flex flex-col gap-6 px-12 py-6 box-border w-full rounded-3xl border border-solid border-gray-200"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-tertiary">Номер заказа</span>
                        <p className="text-primary-t">{index + 1}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-tertiary">Статус</span>
                        <p
                            className={`text-primary-t relative pl-6 before:left-0 before:absolute before:w-3 before:h-3 before:top-1/2 before:-translate-y-1/2 before:rounded-full ${orderStatuses[status as keyof typeof orderStatuses].cn}`}
                        >
                            {orderStatuses[status as keyof typeof orderStatuses].title}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-tertiary">Адрес доставки</span>
                        <p>{getFullAddressString(receiverAddress)}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-tertiary">Тип доставки</span>
                        <p>Бэк не возвращает тип</p>
                    </div>
                    <Link title="Подробнее" to={_id} className="self-start text-tertiary underline" size="none" />
                </li>
            ))}
        </ul>
    );
};

export default HistoryList;