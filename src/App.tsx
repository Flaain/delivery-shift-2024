import { Provider } from "react-redux";
import { router } from "./appRouter";
import { RouterProvider } from "react-router-dom";
import { appStore } from "./utils/redux/store";

const App = () => {
    return (
        <Provider store={appStore}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;