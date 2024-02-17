import React from "react";

import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./utils/constants/router";

import AuthGuard from "./components/AuthGuard/ui";
import GuestGuard from "./components/GuestGuard";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Loadable from "./components/Loadable";
import Spinner from "./components/Spinner";
import DetailedOrderInfoModal from "./components/DetailedOrderInfoModal";

export const Home = Loadable(React.lazy(() => import("@/pages/Home")), <Spinner />);
export const Auth = Loadable(React.lazy(() => import("@/pages/Auth")), <Spinner />);
export const Delivery = Loadable(React.lazy(() => import("@/pages/Delivery")), <Spinner />);
export const History = Loadable(React.lazy(() => import("@/pages/History")), <Spinner />);

export const router = createBrowserRouter([
    {
        element: <Layout headerSlot={<Header />} />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.AUTH,
                element: (
                    <AuthGuard>
                        <Auth />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.DELIVERY,
                element: (
                    <GuestGuard>
                        <Delivery />
                    </GuestGuard>
                ),
                errorElement: <div>Error</div>,
            },
            {
                path: ROUTES.HISTORY,
                element: (
                    <GuestGuard>
                        <History />
                    </GuestGuard>
                ),
                children: [
                    {
                        element: <DetailedOrderInfoModal />,
                        path: ROUTES.DETAILED_HISTORY,
                    },
                ],
            },
        ],
    },
]);
