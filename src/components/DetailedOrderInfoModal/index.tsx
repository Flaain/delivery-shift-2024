import { IHistoryContextType } from "@/pages/History";
import { useNavigate, useOutletContext } from "react-router-dom";

import { IOrder } from "@/utils/api/types";

import { useDetailedOrderInfo } from "@/utils/hooks/useDetaledOrderInfo";

import DetailedOrderInfo from "../DetailedOrderInfo";
import Modal from "../Modal";
import Spinner from "../Spinner";

const DetailedOrderInfoModal = () => {
    const { order, status, token } = useDetailedOrderInfo();
    const { revalidateOrders } = useOutletContext<IHistoryContextType>();

    const statuses = {
        loading: <Spinner />,
        error: <span className="text-red-500">Произошла ошибка</span>,
        success: <DetailedOrderInfo order={order as IOrder} token={token} revalidateOrders={revalidateOrders} />,
    };

    const navigate = useNavigate();

    return (
        <Modal
            onClose={() => navigate(-1)}
            title="Детальная информация"
            className="w-full max-w-[1200px] min-h-[600px]"
        >
            <div className="flex flex-col">{statuses[status]}</div>
        </Modal>
    );
};

export default DetailedOrderInfoModal;