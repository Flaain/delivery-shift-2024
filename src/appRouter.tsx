import Home from "./pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/router";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Home />,
    },
]);