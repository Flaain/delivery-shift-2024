import { ROUTES } from "@/utils/constants/router";
import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { logout, selectSlice } from "@/utils/redux/user/slice";

import Button from "../Button";
import Container from "../Container";
import Link from "../Link";
import Logo from "../Logo";
import Navbar from "../Navbar";
import Spinner from "../Spinner";

const Header = () => {
    const { isAuth, isAuthInProgress } = useAppSelector(selectSlice);

    const dispatch = useAppDispatch();

    return (
        <header className="sticky top-0 bg-white z-50 min-h-[80px] flex items-center">
            <Container className="flex items-center gap-8 relative">
                <Logo />
                <Navbar />
                {isAuthInProgress ? (
                    <Spinner size="sm" position="right" />
                ) : isAuth ? (
                    <Button
                        title="Выйти"
                        size="none"
                        onClick={() => dispatch(logout())}
                        leftIconSlot={<img src={getImageUrl("exit.svg")} alt="иконка выхода" />}
                        isTransparent
                        className="ml-auto text-tertiary font-medium"
                        isText
                    />
                ) : (
                    <Link
                        to={ROUTES.AUTH}
                        size="none"
                        title="Войти"
                        isText
                        isTransparent
                        className="ml-auto text-tertiary font-medium"
                        leftIconSlot={<img src={getImageUrl("exit.svg")} alt="иконка выхода" />}
                    />
                )}
            </Container>
        </header>
    );
};

export default Header;