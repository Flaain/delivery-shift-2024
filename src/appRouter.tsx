import Home from "./pages/Home/ui";
import Layout from "./components/Layout/ui";
import Header from "./components/Header/ui";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/router";

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