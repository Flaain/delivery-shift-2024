import { ROUTES } from "@/utils/constants/router";
import { useAppSelector } from "@/utils/hooks";
import { selectSlice } from "@/utils/redux/user/slice";

import { Navigate } from "react-router-dom";
import Spinner from "../Spinner";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuth, isAuthInProgress } = useAppSelector(selectSlice);

    if (isAuthInProgress) return <Spinner />;

    return isAuth ? <Navigate to={ROUTES.HOME} replace /> : children;
};

export default AuthGuard;