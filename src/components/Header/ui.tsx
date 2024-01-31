import AuthHeader from "../AuthHeader/ui";
import Container from "../Container/ui";
import Logo from "../Logo/ui";
import Navbar from "../Navbar/ui";

const Header = () => {
    return (
        <header className='py-6 px-4 flex items-center box-border mx-auto sticky top-0 bg-white'>
            <Container className="flex items-center max-w-[1200px] w-full mx-auto gap-8">
                <Logo />
                <Navbar />
                <AuthHeader />
            </Container>
        </header>
    );
};

export default Header;