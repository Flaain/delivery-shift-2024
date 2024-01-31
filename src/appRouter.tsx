import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/ui";
import Header from "./components/Header/ui";
import Loadable from "./components/Loadable/ui";
import Spinner from "./components/Spinner/ui";
import { ROUTES } from "./utils/constants/router";

export const Home = Loadable(React.lazy(() => import("@/pages/Home/ui")), <Spinner />);

export const router = createBrowserRouter([
    {
        element: <Layout headerSlot={<Header />} />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
        ],
    },
]);