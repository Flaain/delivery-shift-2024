import { Outlet } from "react-router-dom";

import { useOrdersHistory } from "@/utils/hooks/useOrdersHistory";

import Container from "@/components/Container";
import EmptyHistory from "@/components/EmptyHistory";
import HistoryList from "@/components/HistoryList";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";

export interface IHistoryContextType {
    revalidateOrders: () => void;
}

const History = () => {
    const { loading, orders, revalidateOrders } = useOrdersHistory();

    if (!loading && !orders.length) return <EmptyHistory />;

    return (
        <section className="py-6">
            <Container>
                <Outlet context={{ revalidateOrders }} />
                <Title title="История" className="font-bold mb-5" />
                {loading ? <Spinner /> : <HistoryList orders={orders} />}
            </Container>
        </section>
    );
};

export default History;