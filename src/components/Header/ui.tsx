import AuthHeader from "../AuthHeader/ui";
import Logo from "../Logo/ui";
import Navbar from "../Navbar/ui";

const Header = () => {
    return (
        <header className='py-6 flex items-center gap-8'>
            <Logo />
            <Navbar />
            <AuthHeader />
        </header>
    );
};

export default Header;