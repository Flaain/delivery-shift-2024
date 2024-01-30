import { ROUTES } from "@/utils/constants/router";
import { useAppSelector } from "@/utils/hooks";
import { selectJWT } from "@/utils/redux/user/slice";

import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const jwt = useAppSelector(selectJWT);

    return jwt ? children : <Navigate to={ROUTES.AUTH} replace />;
};

export default GuestGuard;