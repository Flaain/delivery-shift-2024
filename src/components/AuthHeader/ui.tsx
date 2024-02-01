import getImageUrl from "@/utils/helpers/getImageUrl";
import { ROUTES } from "@/utils/constants/router";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { logout, selectJWT } from "@/utils/redux/user/slice";

import { Link } from "react-router-dom";

const AuthHeader = () => {
    const jwt = useAppSelector(selectJWT);

    const dispatch = useAppDispatch();

    return jwt ? (
        <button
            className='text-secondary-t font-medium text-base flex items-center gap-4 hover:text-primary-blue transition-colors duration-200 ease-in-out'
            onClick={() => dispatch(logout())}
        >
            <img src={getImageUrl("exit.svg")} alt={`иконка ${jwt ? "выхода" : "входа"}`} />
            Выйти
        </button>
    ) : (
        <Link to={ROUTES.AUTH} className='flex items-center gap-4 ml-auto hover:text-primary-blue transition-colors duration-200 ease-in-out'>
            <img src={getImageUrl("exit.svg")} alt={`иконка ${jwt ? "выхода" : "входа"}`} />
            Войти
        </Link>
    );
};

export default AuthHeader;