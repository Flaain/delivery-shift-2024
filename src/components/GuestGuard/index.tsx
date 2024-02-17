import { Navigate } from "react-router-dom";

import { ROUTES } from "@/utils/constants/router";
import { useAppSelector } from "@/utils/hooks";
import { selectSlice } from "@/utils/redux/user/slice";

import Spinner from "../Spinner";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuth, isAuthInProgress } = useAppSelector(selectSlice);

    return isAuthInProgress ? <Spinner /> : isAuth ? children : <Navigate to={ROUTES.AUTH} replace />;
};

export default GuestGuard;