import { ROUTES } from "@/utils/constants/router";
import { useAppSelector } from "@/utils/hooks";
import { selectJWT } from "@/utils/redux/user/slice";

import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const jwt = useAppSelector(selectJWT);

    return jwt ? <Navigate to={ROUTES.HOME} replace /> : children;
};

export default AuthGuard;