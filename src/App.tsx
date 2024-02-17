import React from "react";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

import { useAppDispatch } from "./utils/hooks";
import { getSession } from "./utils/redux/user/slice";

const App = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getSession(localStorage.getItem("token")));
    }, []);

    return <RouterProvider router={router} />;
};

export default App;